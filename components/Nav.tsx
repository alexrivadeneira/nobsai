import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
      {/* Lake Merritt watermark — fades in from top-right, stops at nav boundary */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "55%",
        height: "100%",
        backgroundImage: "url(/priyanka-sethy-OPQlgTBDUuk-unsplash.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        filter: "blur(1px) saturate(0.8)",
        maskImage: "linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2" style={{ position: "relative" }}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="NoBSAI" width={80} height={80} className="object-contain" />
          <div>
            <div className="text-4xl leading-tight tracking-tight" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 900 }}>
              <span style={{ color: "#1a1a1a" }}>NoBS</span><span style={{ color: "#2d4a2d" }}>AI</span>
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#2d4a2d" }}>No bloat, simply AI</div>
          </div>
        </Link>

        <p className="text-base md:text-right max-w-xs leading-snug italic pb-2 md:pb-0" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)", fontWeight: 400, textShadow: "0 0 12px #f0ece0, 0 0 24px #f0ece0" }}>
          The East Bay&apos;s home for practical, no-nonsense AI education.
        </p>
      </div>
    </nav>
  );
}
