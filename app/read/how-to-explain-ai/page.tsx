import Link from "next/link";

export default function HowToExplainAI() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8 pb-6" style={{ borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>// Free Guide</div>
        <h1 className="text-4xl font-black uppercase leading-tight mb-4" style={{ color: "#1a1a1a" }}>
          How to Explain AI to Anyone — Without Sounding Like a Nerd
        </h1>
        <div className="text-sm font-medium" style={{ color: "#6b6b6b" }}>By Alex · NoBSAI</div>
      </div>

      <div className="space-y-6 text-base leading-relaxed" style={{ color: "#2a2a2a" }}>
        <p>
          Replace this with your actual content. This page is only reachable after someone submits their email on the /join page — it's not linked anywhere public.
        </p>
        <p>
          Write your guide here. Use plain language, real examples, and keep it practical. That's the whole point of NoBSAI.
        </p>
      </div>

      <div className="mt-16 p-6" style={{ border: "2px solid #1a1a1a", background: "#f0ece0", boxShadow: "4px 4px 0 #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>// Want more?</div>
        <h2 className="text-lg font-black uppercase mb-3" style={{ color: "#1a1a1a" }}>Join an In-Person Workshop</h2>
        <p className="text-sm mb-4" style={{ color: "#4a4a4a" }}>
          Hands-on AI training for founders and operators in the East Bay. Tell us about yourself and we'll be in touch.
        </p>
        <a
          href="https://tally.so"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs font-black uppercase px-5 py-3 text-white"
          style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "2px 2px 0 #1a1a1a" }}
        >
          Tell us about yourself →
        </a>
      </div>

      <div className="mt-10 pt-8" style={{ borderTop: "2px solid #1a1a1a" }}>
        <Link href="/" className="text-xs font-black uppercase tracking-widest" style={{ color: "#1a1a1a" }}>
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
