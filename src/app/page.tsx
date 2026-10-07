"use client";

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [checkoutItem, setCheckoutItem] = useState<{name: string, price: string} | null>(null);

  // A very basic keyword parser to simulate the LLM extracting intent
  // In reality, this would be a tool call returned by the AI SDK
  React.useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "assistant") {
      if (lastMsg.content.toLowerCase().includes("ready to checkout")) {
        setCheckoutItem({ name: "Nike Air Max", price: "120.00" });
      }
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-slate-100 flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          PayGroq
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          AI Smart Payments powered by Groq & PayPal Sandbox.
        </p>

        <div className="flex-1 mt-8">
          <h3 className="text-lg font-semibold mb-4">Demo Instructions</h3>
          <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
            <li>Type "I want to buy some sneakers"</li>
            <li>The AI will process the request.</li>
            <li>When ready, the PayPal modal will appear seamlessly on the right.</li>
          </ul>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="w-full md:w-2/3 flex flex-col relative">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-zinc-500 mt-20">
              <p className="text-xl">Start a conversation to checkout instantly.</p>
            </div>
          )}
          
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-zinc-800 text-zinc-200'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-zinc-800 text-zinc-200 animate-pulse">
                Thinking at 800 tokens/sec...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              placeholder="E.g. I want to buy the latest sneakers..."
              onChange={handleInputChange}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 font-semibold transition-colors"
            >
              Send
            </button>
          </form>
        </div>

        {/* Floating Checkout Overlay */}
        {checkoutItem && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 p-8 rounded-2xl max-w-md w-full border border-zinc-800 shadow-2xl">
              <h2 className="text-2xl font-bold mb-2">Instant Checkout</h2>
              <div className="flex justify-between items-center bg-zinc-800 p-4 rounded-lg mb-6">
                <span>{checkoutItem.name}</span>
                <span className="font-bold text-emerald-400">${checkoutItem.price}</span>
              </div>
              
              <PayPalScriptProvider options={{ clientId: "test" }}>
                <PayPalButtons 
                  style={{ layout: "vertical", theme: "dark" }} 
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: checkoutItem.price,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      alert(`Transaction completed by ${details.payer.name?.given_name}!`);
                      setCheckoutItem(null);
                    });
                  }}
                />
              </PayPalScriptProvider>

              <button 
                onClick={() => setCheckoutItem(null)}
                className="mt-4 w-full text-zinc-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
