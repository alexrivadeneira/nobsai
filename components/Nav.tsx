import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="NoBSAI" width={80} height={80} className="object-contain" />
          <div>
            <div className="text-4xl leading-tight tracking-tight" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 900 }}>
              NoBSAI
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#2d4a2d" }}>No Bloat, Straight AI</div>
          </div>
        </Link>

        <p className="text-base md:text-right max-w-[240px] leading-snug italic" style={{ color: "#4a4a4a", fontFamily: "var(--font-fraunces)", fontWeight: 400 }}>
          The East Bay&apos;s home for actionable, no-nonsense AI education.
        </p>
      </div>
    </nav>
  );
}
