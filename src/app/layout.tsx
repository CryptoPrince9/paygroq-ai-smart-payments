import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaInsane | Autonomous AI Chief Marketing Officer (CMO)",
  description: "Enterprise-grade autonomous AI CMO system with real-time analytics, competitor surveillance, B2B outreach, and on-chain Web3 settlement.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
