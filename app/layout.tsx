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
    <footer style={{ background: "#2d4a2d", color: "#f5f0e8" }} className="mt-16 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#8fb08f" }}>About Us</h3>
          <p className="text-sm opacity-75">Straight talk on AI for people who don't have time for the BS.</p>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#8fb08f" }}>Home</h3>
          <ul className="space-y-1 text-sm opacity-75">
            <li><a href="/" className="hover:opacity-100">Blog</a></li>
            <li><a href="/workshops" className="hover:opacity-100">Workshops</a></li>
            <li><a href="/templates" className="hover:opacity-100">Templates</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#8fb08f" }}>About</h3>
          <ul className="space-y-1 text-sm opacity-75">
            <li><a href="/about" className="hover:opacity-100">Premise</a></li>
            <li><a href="/events" className="hover:opacity-100">Events</a></li>
            <li><a href="/contact" className="hover:opacity-100">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: "#8fb08f" }}>Contact</h3>
          <ul className="space-y-1 text-sm opacity-75">
            <li><a href="/contact" className="hover:opacity-100">Contact the team</a></li>
            <li><a href="/register" className="hover:opacity-100">Register online</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/10 text-xs opacity-50 flex justify-between">
        <span>© 2025 NoBSAI</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
