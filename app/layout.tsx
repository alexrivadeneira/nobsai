import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SurveyBar from "@/components/SurveyBar";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "noBSAI — AI without the hype",
  description: "Plain-English AI education for East Bay locals. Free guide + in-person workshops. No jargon, no PhD required.",
  openGraph: {
    title: "noBSAI — AI without the hype",
    description: "Plain-English AI education for East Bay locals. Free guide + in-person workshops. No jargon, no PhD required.",
    url: "https://www.nobsai.tech",
    siteName: "noBSAI",
    images: [{ url: "https://www.nobsai.tech/og-image.png", width: 1200, height: 628, alt: "noBSAI — AI without the hype" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "noBSAI — AI without the hype",
    description: "Plain-English AI education for East Bay locals. Free guide + in-person workshops. No jargon, no PhD required.",
    images: ["https://www.nobsai.tech/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "#f5f0e8", fontFamily: "var(--font-inter)" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <SurveyBar />
        <Analytics />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4Q3YPNZTLL" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4Q3YPNZTLL');
        `}</Script>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-16 py-10 px-8" style={{ background: "#1a1a1a", borderTop: "2px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="text-lg tracking-tight text-white mb-1" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 900 }}>noBSAI</div>
          <div className="text-xs uppercase tracking-widest" style={{ color: "#7ab87a" }}>No Bloat, Simple AI</div>
        </div>
        <div className="text-xs text-white/40 self-end">© 2025 noBSAI</div>
      </div>
    </footer>
  );
}
