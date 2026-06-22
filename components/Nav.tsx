import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b" style={{ background: "#f5f0e8", borderColor: "#d4c9b0" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#2d4a2d" }}>
            NB
          </div>
          <div>
            <div className="font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#2d4a2d" }}>
              NoBSAI
            </div>
            <div className="text-xs" style={{ color: "#6b6b6b" }}>No Bloat, Straight AI</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
