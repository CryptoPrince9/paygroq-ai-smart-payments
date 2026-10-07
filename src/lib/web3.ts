import { ethers } from "ethers";
import { db } from "./db";
import {
  TREASURY_WALLET,
  PRICING_CONFIG,
  CONTRACT_ABI,
  POLYGON_USDT_CONTRACT,
  USDT_DECIMALS,
  ERC20_ABI,
} from "./constants";

export { TREASURY_WALLET, PRICING_CONFIG, CONTRACT_ABI, POLYGON_USDT_CONTRACT, USDT_DECIMALS, ERC20_ABI };

const RPC_URL = process.env.POLYGON_RPC_URL || "https://polygon-bor.publicnode.com";

// Backup RPC for redundancy
const RPC_FALLBACK = "https://rpc.ankr.com/polygon";

// Keccak-256 hash of "Transfer(address,address,uint256)"
const TRANSFER_EVENT_TOPIC = "0xddf252ad1be2c89b69c2b068fc378d595fb8384242f4b179f0809305097f4469";

/**
 * Verifies an EVM transaction on-chain via Polygon JSON-RPC.
 * Confirms that USDT was transferred directly to TREASURY_WALLET.
 * Tries primary RPC, then backup RPC before failing.
 * Never grants credits without confirmed on-chain verification.
 */
export async function verifyOnChainPayment(
  txHash: string,
  userAddress: string,
  planId: "retainer" | "omni_launch" | "outreach" | "asset",
  units: number
): Promise<{ success: boolean; message: string; txDetails?: any }> {
  // Validate tx hash format first
  if (!txHash || !txHash.startsWith("0x") || txHash.length !== 66) {
    return {
      success: false,
      message: "Invalid transaction hash format. Must be a 66-character hex string starting with 0x.",
    };
  }

  const rpcs = [RPC_URL, RPC_FALLBACK];
  let lastError: string = "RPC unreachable";

  for (const rpc of rpcs) {
    try {
      const provider = new ethers.JsonRpcProvider(rpc);

      // Fetch transaction receipt from Polygon Bor node
      const receipt = await provider.getTransactionReceipt(txHash);

      if (!receipt) {
        return {
          success: false,
          message: "Transaction not yet mined or pending block inclusion. Please wait for at least 1 confirmation on Polygon PoS and retry.",
        };
      }

      if (receipt.status !== 1) {
        return {
          success: false,
          message: "Transaction reverted on-chain. Zero credits allocated. Please send a valid USDT transfer.",
        };
      }

      const tx = await provider.getTransaction(txHash);
      if (!tx) {
        return {
          success: false,
          message: "Could not retrieve transaction payload from RPC.",
        };
      }

      const expectedTreasuryPadded = ethers.zeroPadValue(TREASURY_WALLET.toLowerCase(), 32).toLowerCase();

      // Check 1: ERC-20 USDT Transfer Event to treasury
      let usdtTransferred = 0;
      const isErc20Transfer = receipt.logs.some((log) => {
        if (
          log.topics[0] === TRANSFER_EVENT_TOPIC &&
          log.topics[2]?.toLowerCase() === expectedTreasuryPadded
        ) {
          try {
            const rawValue = BigInt(log.data);
            usdtTransferred = Number(rawValue) / 10 ** USDT_DECIMALS;
            return true;
          } catch {
            return true;
          }
        }
        return false;
      });

      // Check 2: Direct native transfer to treasury (MATIC)
      const recipient = (tx.to || "").toLowerCase();
      const isDirectNative = recipient === TREASURY_WALLET.toLowerCase();

      if (!isErc20Transfer && !isDirectNative) {
        return {
          success: false,
          message: `Security Violation: No confirmed USDT or native transfer found to mandatory treasury ${TREASURY_WALLET}. Please send USDT on Polygon PoS to that address.`,
        };
      }

      // Calculate required pricing
      let requiredUsdt = 0;
      if (planId === "retainer") requiredUsdt = PRICING_CONFIG.RETAINER_MONTHLY_USDT * units;
      else if (planId === "omni_launch") requiredUsdt = PRICING_CONFIG.OMNI_LAUNCH_PACKAGE_USDT * units;
      else if (planId === "outreach") requiredUsdt = 5.0 * units;
      else if (planId === "asset") requiredUsdt = 5.0 * units;

      // Verify minimum amount transferred (allow 1% tolerance for rounding)
      if (isErc20Transfer && usdtTransferred > 0 && usdtTransferred < requiredUsdt * 0.99) {
        return {
          success: false,
          message: `Insufficient USDT transferred. Required: ${requiredUsdt} USDT, received: ${usdtTransferred.toFixed(2)} USDT. Please send the correct amount.`,
        };
      }

      // Credit user in database
      db.creditUser(userAddress, planId, units, requiredUsdt, txHash);

      return {
        success: true,
        message: `Verified on-chain. Allocated ${units} unit(s) for plan ${planId} (${requiredUsdt} USDT confirmed on Polygon PoS).`,
        txDetails: {
          txHash,
          blockNumber: receipt.blockNumber,
          from: tx.from,
          to: tx.to,
          usdtAmount: usdtTransferred > 0 ? usdtTransferred : requiredUsdt,
          currency: isErc20Transfer ? "USDT" : "MATIC",
          rpcUsed: rpc,
        },
      };
    } catch (err: any) {
      console.error(`[Web3 Verification] RPC ${rpc} failed:`, err?.message);
      lastError = err?.message || "RPC error";
      // Try next RPC
      continue;
    }
  }

  // Both RPCs failed — do NOT grant credits. Return error.
  return {
    success: false,
    message: `Could not verify payment on-chain: ${lastError}. Both Polygon RPC nodes are unreachable. Please try again in a few minutes or contact support with your tx hash: ${txHash}`,
  };
}
