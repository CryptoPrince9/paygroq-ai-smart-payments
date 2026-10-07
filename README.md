# PayGroq - AI Smart Payments

![PayGroq Banner](https://devpost.com/software/paygroq-ai-smart-payments)

PayGroq is an open-source, ultra-fast conversational checkout assistant designed for the **PayPal AI Hackathon**. 

It entirely replaces the traditional e-commerce "add to cart" click-flow with a direct conversational interface powered by Groq's lightning-fast LPU, seamlessly bridging the gap between product discovery and secure checkout via PayPal Sandbox integration.

## 🚀 Core Features
- **Zero-Latency Interactions**: Powered by Groq AI, delivering up to 800 tokens per second for real-time conversational shopping.
- **PayPal Native Sandbox Checkout**: One-tap secure checkout overlay powered by `@paypal/react-paypal-js`. 
- **Dark Mode Glassmorphism UI**: Beautiful, intuitive, and modern UI built with Next.js and Tailwind CSS.
- **Intent Recognition Engine**: Automatically triggers the PayPal payment flow the moment a user expresses purchase intent.

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), React 19, Tailwind CSS.
- **Backend/API**: Vercel Serverless Edge functions.
- **AI Engine**: Groq API (simulated via Vercel AI SDK standards).
- **Payments**: PayPal Developer REST API.

## 💻 Local Development
Getting started locally is incredibly simple.

### 1. Clone the Repository
```bash
git clone https://github.com/CryptoPrince9/paygroq-ai-smart-payments.git
cd paygroq-ai-smart-payments
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:3000`. 

To test the integration:
1. Open the UI.
2. Type "I want to buy some sneakers".
3. Watch the AI respond and instantly trigger the PayPal checkout modal.

## 📝 License
This project is open-sourced under the MIT License. Built for the 2026 PayPal AI Hackathon.
