import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ background: "#f0ece0", borderBottom: "2px solid #1a1a1a" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-white text-xs font-black" style={{ background: "#2d4a2d" }}>
            NB
          </div>
          <div>
            <div className="font-black text-xl leading-tight tracking-tight uppercase" style={{ color: "#1a1a1a" }}>
              NoBSAI
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#2d4a2d" }}>No Bloat, Straight AI</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
