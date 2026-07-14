import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SurveyBar from "@/components/SurveyBar";
import AnalyticsClient from "@/components/AnalyticsClient";
import Script from "next/script";
import Link from "next/link";

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
  metadataBase: new URL("https://www.nobsai.tech"),
  title: {
    default: "noBSAI — AI without the hype",
    template: "%s · noBSAI",
  },
  description: "Plain-English AI education for East Bay locals. Free guide + in-person workshops. No jargon, no PhD required.",
  openGraph: {
    url: "https://www.nobsai.tech",
    siteName: "noBSAI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
        <AnalyticsClient />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4Q3YPNZTLL" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          if (window.localStorage && localStorage.getItem('va-disable')) {
            window['ga-disable-G-4Q3YPNZTLL'] = true;
          }
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
  const links = [
    { label: "The Path", href: "/#path" },
    { label: "Office Hours", href: "/#office-hours" },
    { label: "Daily Digest Archive", href: "/digest" },
    { label: "Free guide: Explain AI to Anyone", href: "/join?guide=true" },
  ];
  return (
    <footer className="mt-16" style={{ background: "#1a1a1a", borderTop: "2px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-6">
        <div className="text-center text-xs font-black uppercase tracking-widest mb-5" style={{ color: "#8a7a5a" }}>
          Taught &amp; Built At
        </div>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/experience-logos.png"
            alt="Facebook, Meta, Salesforce, Asana, and Berkeley Public Library"
            className="w-full max-w-2xl object-contain"
          />
        </div>
      </div>
      <div style={{ borderTop: "1px solid #3a3a3a" }}>
        <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <p className="text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>
            Before getting into tech, I was a high school educator. I&apos;ve taught coding classes
            at Berkeley Public Library and worked over a decade at startups and big tech. NoBSAI is
            where I teach AI the same way: plainly.
          </p>
          <ul className="space-y-1.5">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm hover:underline" style={{ color: "#e8a33d", textUnderlineOffset: "3px" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-sm md:text-right" style={{ color: "#9a9a9a" }}>
            © 2026 NoBSAI · Alameda, CA
          </div>
        </div>
      </div>
    </footer>
  );
}
