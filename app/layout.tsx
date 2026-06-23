import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoBSAI",
  description: "Straight talk on AI — no fluff, no hype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "#f5f0e8", fontFamily: "var(--font-inter)" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-16 py-10 px-8" style={{ background: "#1a1a1a", borderTop: "2px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="font-black text-lg uppercase tracking-tight text-white mb-1">NoBSAI</div>
          <div className="text-xs uppercase tracking-widest" style={{ color: "#7ab87a" }}>No Bloat, Straight AI</div>
        </div>
        <div className="text-xs text-white/40 self-end">© 2025 NoBSAI</div>
      </div>
    </footer>
  );
}
