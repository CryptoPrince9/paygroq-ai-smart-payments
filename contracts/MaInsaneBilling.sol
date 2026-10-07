// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title MaInsaneBilling
 * @notice Production On-Chain Billing & Access Control Gateway for MaInsane AI CMO.
 * @dev All revenue and payments are irreversibly routed directly to the treasury wallet:
 *      0x32C2c16b8821dE40F1d71FB67b050542F87f58F8
 */
contract MaInsaneBilling {
    // HARDCODED TREASURY DESTINATION ADDRESS
    address payable public constant TREASURY_WALLET = payable(0x32C2c16b8821dE40F1d71FB67b050542F87f58F8);

    // Pricing in USD cents (1 USD = 100 cents)
    uint256 public constant RETAINER_MONTHLY_USD_CENTS = 19900;     // $199.00 / month (Strategic CMO Retainer)
    uint256 public constant OMNI_LAUNCH_PACKAGE_USD_CENTS = 1500;   // $15.00 / package (Omni-Launchpad 360°)
    uint256 public constant OUTREACH_ACTION_USD_CENTS = 5;          // $0.05 / action
    uint256 public constant ASSET_GENERATION_USD_CENTS = 500;       // $5.00 / asset

    // Price of 1 MATIC / Native Token in USD Cents (Default $0.50 = 50 cents)
    // Updated via on-chain oracle or owner sync
    uint256 public nativeTokenPriceInCents = 50; 
    address public owner;

    struct Subscription {
        uint256 validUntil;
        uint256 totalPaid;
    }

    struct Credits {
        uint256 omniLaunchPackages;
        uint256 outreachActions;
        uint256 assetGenerations;
    }

    mapping(address => Subscription) public subscriptions;
    mapping(address => Credits) public accountCredits;

    event RetainerSubscribed(
        address indexed subscriber,
        uint256 months,
        uint256 amountPaidWei,
        uint256 validUntil
    );

    event OutreachCreditsPurchased(
        address indexed subscriber,
        uint256 actionCount,
        uint256 amountPaidWei,
        uint256 totalOutreachBalance
    );

    event OmniLaunchPackagePurchased(
        address indexed subscriber,
        uint256 packageCount,
        uint256 amountPaidWei,
        uint256 totalLaunchCredits
    );

    event AssetCreditsPurchased(
        address indexed subscriber,
        uint256 assetCount,
        uint256 amountPaidWei,
        uint256 totalAssetBalance
    );

    event PriceFeedUpdated(uint256 newNativeTokenPriceInCents);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Calculate required native token (MATIC/ETH) in Wei for a given amount in USD cents
     */
    function calculateWeiCost(uint256 usdCents) public view returns (uint256) {
        require(nativeTokenPriceInCents > 0, "Invalid price feed");
        // Wei = (cents * 1e18) / pricePerTokenInCents
        return (usdCents * 1e18) / nativeTokenPriceInCents;
    }

    /**
     * @notice Subscribe to Strategic CMO Retainer ($199/month)
     * @param months Number of months to subscribe
     */
    function subscribeRetainer(uint256 months) external payable {
        require(months > 0, "Must subscribe for at least 1 month");
        uint256 totalCostCents = RETAINER_MONTHLY_USD_CENTS * months;
        uint256 requiredWei = calculateWeiCost(totalCostCents);
        require(msg.value >= requiredWei, "Insufficient native currency sent");

        uint256 currentExpiry = subscriptions[msg.sender].validUntil;
        uint256 startTime = currentExpiry > block.timestamp ? currentExpiry : block.timestamp;
        uint256 newExpiry = startTime + (months * 30 days);

        subscriptions[msg.sender].validUntil = newExpiry;
        subscriptions[msg.sender].totalPaid += msg.value;

        // Route funds directly to treasury
        (bool success, ) = TREASURY_WALLET.call{value: msg.value}("");
        require(success, "Treasury transfer failed");

        emit RetainerSubscribed(msg.sender, months, msg.value, newExpiry);
    }

    /**
     * @notice Purchase Omni-Launchpad 360° Package ($15.00 per full marketing rollout)
     * @param packageCount Number of Omni-Launchpad 360 packages to purchase
     */
    function buyOmniLaunchPackage(uint256 packageCount) external payable {
        require(packageCount > 0, "Must buy at least 1 launchpad package");
        uint256 totalCostCents = OMNI_LAUNCH_PACKAGE_USD_CENTS * packageCount;
        uint256 requiredWei = calculateWeiCost(totalCostCents);
        require(msg.value >= requiredWei, "Insufficient native currency sent");

        accountCredits[msg.sender].omniLaunchPackages += packageCount;

        // Route funds directly to treasury
        (bool success, ) = TREASURY_WALLET.call{value: msg.value}("");
        require(success, "Treasury transfer failed");

        emit OmniLaunchPackagePurchased(
            msg.sender,
            packageCount,
            msg.value,
            accountCredits[msg.sender].omniLaunchPackages
        );
    }

    /**
     * @notice Purchase Automated B2B Outreach Actions ($0.05 per action)
     * @param actionCount Number of outreach actions to purchase (e.g., 100 = $5.00)
     */
    function buyOutreachCredits(uint256 actionCount) external payable {
        require(actionCount >= 20, "Minimum purchase is 20 actions ($1.00)");
        uint256 totalCostCents = OUTREACH_ACTION_USD_CENTS * actionCount;
        uint256 requiredWei = calculateWeiCost(totalCostCents);
        require(msg.value >= requiredWei, "Insufficient native currency sent");

        accountCredits[msg.sender].outreachActions += actionCount;

        // Route funds directly to treasury
        (bool success, ) = TREASURY_WALLET.call{value: msg.value}("");
        require(success, "Treasury transfer failed");

        emit OutreachCreditsPurchased(
            msg.sender,
            actionCount,
            msg.value,
            accountCredits[msg.sender].outreachActions
        );
    }

    /**
     * @notice Purchase Content & Asset Generation credits ($5.00 per asset)
     * @param assetCount Number of video/campaign assets (e.g., 1 = $5.00)
     */
    function buyAssetCredits(uint256 assetCount) external payable {
        require(assetCount > 0, "Must buy at least 1 asset credit");
        uint256 totalCostCents = ASSET_GENERATION_USD_CENTS * assetCount;
        uint256 requiredWei = calculateWeiCost(totalCostCents);
        require(msg.value >= requiredWei, "Insufficient native currency sent");

        accountCredits[msg.sender].assetGenerations += assetCount;

        // Route funds directly to treasury
        (bool success, ) = TREASURY_WALLET.call{value: msg.value}("");
        require(success, "Treasury transfer failed");

        emit AssetCreditsPurchased(
            msg.sender,
            assetCount,
            msg.value,
            accountCredits[msg.sender].assetGenerations
        );
    }

    /**
     * @notice Direct Deposit fallback routing directly to Treasury
     */
    receive() external payable {
        require(msg.value > 0, "Zero deposit");
        (bool success, ) = TREASURY_WALLET.call{value: msg.value}("");
        require(success, "Treasury transfer failed");
    }

    fallback() external payable {
        require(msg.value > 0, "Zero deposit");
        (bool success, ) = TREASURY_WALLET.call{value: msg.value}("");
        require(success, "Treasury transfer failed");
    }

    /**
     * @notice Check if address has active CMO retainer
     */
    function isRetainerActive(address subscriber) external view returns (bool, uint256) {
        uint256 expiry = subscriptions[subscriber].validUntil;
        return (expiry > block.timestamp, expiry);
    }

    /**
     * @notice Update native token conversion rate
     */
    function setNativeTokenPriceInCents(uint256 _priceInCents) external onlyOwner {
        require(_priceInCents > 0, "Price must be > 0");
        nativeTokenPriceInCents = _priceInCents;
        emit PriceFeedUpdated(_priceInCents);
    }
}
