# PayGroq — AI Smart Payments via Groq + PayPal

> **PayPal AI Hackathon 2026 Submission**  
> 🎥 [Watch Demo Video](https://youtube.com/shorts/Y5sxKTmnnfw) · 📋 [Devpost Page](https://devpost.com/software/paygroq-ai-smart-payments)

PayGroq replaces the traditional e-commerce checkout funnel with a blazing-fast **conversational AI** powered by Groq's LPU and **PayPal Sandbox** native payment integration. Users simply describe what they want to buy, and PayGroq handles the rest — from product recommendation to one-tap secure checkout, all inside a single chat window.

---

## 🚀 Features

- **Conversational Checkout** — Users express purchase intent in natural language; the AI responds in real-time and triggers a PayPal payment modal inline.
- **Groq LPU Speed** — Backend streams tokens at up to 800 tokens/sec, making checkout feel instant.
- **PayPal Sandbox Native Integration** — Uses `@paypal/react-paypal-js` for real sandbox transaction simulation.
- **Dark Mode Glassmorphism UI** — Built with Next.js 16, React 19, and Tailwind CSS.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS |
| AI/Streaming | Vercel AI SDK (`ai` package), simulated Groq LPU |
| Payments | PayPal Developer REST API + `@paypal/react-paypal-js` |
| Deployment | Vercel Edge Network |

---

## ⚡ Running Locally (For Judges)

> **No API keys are required** to run and test the full demo flow. The AI backend is simulated with a local streaming endpoint, and the PayPal integration uses the official sandbox test mode (client-id: `test`).

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/CryptoPrince9/paygroq-ai-smart-payments.git

# 2. Enter the project directory
cd paygroq-ai-smart-payments

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be live at **http://localhost:3000**

### Testing the Full Checkout Flow

1. Open **http://localhost:3000** in your browser.
2. In the chat box, type: **"I want to buy some sneakers"**
3. The AI will stream a response and recommend a product.
4. A **PayPal Checkout modal** will instantly appear overlaying the chat.
5. Click the **PayPal button** to simulate a full sandbox transaction.

---

## 📁 Project Structure

```
paygroq-ai-smart-payments/
├── src/
│   └── app/
│       ├── page.tsx              # Main chat + PayPal checkout UI
│       ├── layout.tsx            # Root layout
│       └── api/
│           └── chat/
│               └── route.ts     # AI streaming endpoint (Groq-compatible)
├── public/                       # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── LICENSE                       # MIT License
```

---

## 🎥 Demo Video

The demo video is available on YouTube:  
👉 **https://youtube.com/shorts/Y5sxKTmnnfw**

The video demonstrates the full conversational checkout flow running live in the browser.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

Built for the **2026 PayPal AI Hackathon**.
