"use client";
import Link from "next/link";

// ── SVG Illustrations ──────────────────────────────────────────────────────

function IconFunction() {
  return (
    <svg viewBox="0 0 200 80" width="200" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Input arrow */}
      <text x="2" y="38" fontSize="10" fontFamily="monospace" fill="#2d4a2d" fontWeight="bold">"text in"</text>
      <line x1="2" y1="45" x2="58" y2="45" stroke="#1a1a1a" strokeWidth="2"/>
      <polygon points="56,40 66,45 56,50" fill="#1a1a1a"/>
      {/* Box */}
      <rect x="66" y="28" width="68" height="34" fill="white" stroke="#1a1a1a" strokeWidth="2.5"/>
      <text x="100" y="47" fontSize="13" fontFamily="monospace" fill="#1a1a1a" fontWeight="bold" textAnchor="middle">LLM</text>
      {/* Output arrow */}
      <line x1="134" y1="45" x2="190" y2="45" stroke="#1a1a1a" strokeWidth="2"/>
      <polygon points="188,40 198,45 188,50" fill="#1a1a1a"/>
      <text x="136" y="38" fontSize="10" fontFamily="monospace" fill="#2d4a2d" fontWeight="bold">"text out"</text>
    </svg>
  );
}

function IconWrapper() {
  return (
    <svg viewBox="0 0 160 110" width="160" height="110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer box: ChatGPT */}
      <rect x="4" y="4" width="152" height="102" fill="#f0ece0" stroke="#1a1a1a" strokeWidth="2.5" strokeDasharray="6 3"/>
      <text x="12" y="18" fontSize="9" fontFamily="monospace" fill="#1a1a1a" fontWeight="bold">ChatGPT</text>
      {/* Inner box: LLM */}
      <rect x="36" y="28" width="88" height="52" fill="white" stroke="#1a1a1a" strokeWidth="2.5"/>
      <text x="80" y="58" fontSize="13" fontFamily="monospace" fill="#1a1a1a" fontWeight="bold" textAnchor="middle">LLM</text>
    </svg>
  );
}

function IconDial() {
  return (
    <svg viewBox="0 0 140 90" width="140" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dial circle */}
      <circle cx="70" cy="58" r="38" fill="white" stroke="#1a1a1a" strokeWidth="2.5"/>
      {/* Arc ticks */}
      <line x1="36" y1="58" x2="44" y2="58" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="40" y1="32" x2="45" y2="39" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="70" y1="24" x2="70" y2="32" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="100" y1="32" x2="95" y2="39" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="104" y1="58" x2="96" y2="58" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Needle pointing ~30% (low temp) */}
      <line x1="70" y1="58" x2="44" y2="36" stroke="#2d4a2d" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="70" cy="58" r="4" fill="#1a1a1a"/>
      {/* Labels */}
      <text x="18" y="72" fontSize="8" fontFamily="monospace" fill="#1a1a1a" fontWeight="bold">0</text>
      <text x="104" y="72" fontSize="8" fontFamily="monospace" fill="#1a1a1a" fontWeight="bold">MAX</text>
      <text x="70" y="12" fontSize="8" fontFamily="monospace" fill="#6b6b6b" textAnchor="middle">TEMPERATURE</text>
    </svg>
  );
}

function IconMegaphoneX() {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="8,14 8,26 16,26 30,34 30,6 16,14" fill="white" stroke="#b94a4a" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="2" y1="2" x2="38" y2="38" stroke="#b94a4a" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="#2d4a2d" strokeWidth="2"/>
      <circle cx="20" cy="20" r="9" stroke="#2d4a2d" strokeWidth="2"/>
      <circle cx="20" cy="20" r="3" fill="#2d4a2d"/>
    </svg>
  );
}

// ── Buzzword data ──────────────────────────────────────────────────────────

const TERMS = [
  {
    word: "Agent",
    scary: "Autonomous AI making its own decisions",
    real: "A program that calls an LLM in a loop and runs functions a human wrote. The LLM produces text; the program pushes the buttons.",
  },
  {
    word: "Hallucination",
    scary: "AI going rogue and seeing things",
    real: "The LLM outputs something that sounds confident and coherent but is factually wrong. No perception involved — just a bad statistical guess.",
  },
  {
    word: "Thinking",
    scary: "AI reasoning like a human brain",
    real: "Billions of simple math operations running very fast. High school algebra, repeated at insane scale.",
  },
  {
    word: "Training / Learning",
    scary: "AI teaching itself and evolving",
    real: "Feeding data through the model, measuring how wrong the output is, and nudging billions of numbers slightly in the right direction. Mathematical optimization.",
  },
  {
    word: "Bias",
    scary: "AI with prejudiced opinions or motives",
    real: "Lopsided patterns in the training data carry through to the output. A statistical skew, not an emotional opinion.",
  },
  {
    word: "Neural / Neuron",
    scary: "Digital brain modeled on the human mind",
    real: "A math model loosely inspired by neurons — but barely comparable to actual biology. Don't let the name mislead you.",
  },
  {
    word: "Temperature",
    scary: "How \"hot\" or emotional the AI is",
    real: "A dial that controls randomness. At 0, it always picks the most likely next word. Higher values make it pick less obvious words more often.",
  },
  {
    word: "AI is taking jobs",
    scary: "Unstoppable machine making decisions",
    real: "Companies choosing to automate work. The AI didn't decide — a human did.",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function HowToExplainAI() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10 pb-6" style={{ borderBottom: "2px solid #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>// Free Guide</div>
        <h1 className="text-4xl font-black uppercase leading-tight mb-3" style={{ color: "#1a1a1a", fontFamily: "var(--font-fraunces)" }}>
          AI Without the Magic
        </h1>
        <p className="text-lg" style={{ color: "#4a4a4a" }}>
          A plain-English breakdown you can actually use — and share.
        </p>
        <div className="text-xs font-medium mt-3" style={{ color: "#9a9a9a" }}>By Alex · noBSAI</div>
      </div>

      {/* Part 1 */}
      <div className="mb-12">
        <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#2d4a2d" }}>// Part 1</div>
        <h2 className="text-2xl font-black uppercase mb-6" style={{ color: "#1a1a1a" }}>What an LLM actually is</h2>

        <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#2a2a2a" }}>
          <p>
            The anxiety around AI usually comes from one idea: that it's <em>magical</em> or <em>human-like</em>. It isn't. At a high level, an LLM is a function — the same kind you saw in high school algebra.
          </p>

          <div className="my-6 p-5" style={{ border: "2px solid #1a1a1a", background: "#f0ece0", boxShadow: "4px 4px 0 #1a1a1a" }}>
            <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#2d4a2d" }}>// The idea</div>
            <div className="flex flex-col gap-4">
              <div className="font-mono text-sm">
                <div><span style={{ color: "#2d4a2d" }}>f(x)</span> = x + 2 &nbsp;<span className="text-xs" style={{ color: "#6b6b6b" }}>— pass in 1, get 3. always.</span></div>
              </div>
              <div className="flex items-center gap-4">
                <IconFunction />
              </div>
              <div className="text-xs" style={{ color: "#6b6b6b" }}>
                Pass in "The cat…" → get "The cat sat". Bigger function, same idea.
              </div>
            </div>
          </div>

          <p>
            What makes it feel magical is the sheer size — billions of numbers doing simple math at enormous speed. But it's still just a function.
          </p>
        </div>
      </div>

      {/* Part 2 */}
      <div className="mb-12">
        <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#2d4a2d" }}>// Part 2</div>
        <h2 className="text-2xl font-black uppercase mb-6" style={{ color: "#1a1a1a" }}>ChatGPT is not an LLM</h2>

        <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#2a2a2a" }}>
          <p>
            ChatGPT is a software application <em>wrapped around</em> an LLM. Before your message ever reaches the model, ChatGPT intercepts it and loads it up with extra context.
          </p>

          <div className="my-6 flex gap-6 items-start flex-wrap">
            <IconWrapper />
            <div className="text-xs leading-relaxed flex-1 min-w-[160px]" style={{ color: "#4a4a4a" }}>
              <p className="mb-2">ChatGPT adds: your conversation history, your account info, a timestamp, tone instructions, and more — before anything hits the LLM.</p>
              <p>This is why the same question gives different answers. Under correct circumstances, the LLM is deterministic — the output doesn't change for a given input. ChatGPT changes the results.</p>
            </div>
          </div>

          <div style={{ border: "2px solid #1a1a1a", boxShadow: "4px 4px 0 #1a1a1a" }}>
            <div className="p-3" style={{ background: "#2d4a2d", borderBottom: "2px solid #1a1a1a" }}>
              <div className="text-xs font-black uppercase tracking-widest" style={{ color: "#7ab87a" }}>What you typed</div>
            </div>
            <div className="p-3 text-xs font-mono" style={{ background: "white", borderBottom: "2px solid #1a1a1a" }}>
              "Why do I have purple spots on my arm?"
            </div>
            <div className="p-3" style={{ background: "#2d4a2d", borderBottom: "2px solid #1a1a1a" }}>
              <div className="text-xs font-black uppercase tracking-widest" style={{ color: "#7ab87a" }}>What actually hit the LLM</div>
            </div>
            <div className="p-3 text-xs font-mono leading-relaxed" style={{ background: "#f0ece0", color: "#4a4a4a" }}>
              The user asked: "Why do I have purple spots on my arm?" This appears to be a medical question. Respond in a concerned tone. Add medical boilerplate. Known facts about user: age 40, previous questions about hiking in Berkeley…
            </div>
          </div>
        </div>
      </div>

      {/* Part 3 */}
      <div className="mb-14">
        <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#2d4a2d" }}>// Part 3</div>
        <h2 className="text-2xl font-black uppercase mb-6" style={{ color: "#1a1a1a" }}>The randomness dial</h2>

        <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#2a2a2a" }}>
          <p>
            LLMs have a setting called <strong>temperature</strong>. When picking the next word, the model considers several options. Temperature controls how adventurous it gets.
          </p>

          <div className="my-6 flex gap-6 items-start flex-wrap">
            <IconDial />
            <div className="grid grid-cols-2 gap-3 flex-1 min-w-[200px]">
              <div className="p-3" style={{ border: "2px solid #1a1a1a", background: "white" }}>
                <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>Temp = 0</div>
                <p className="text-xs" style={{ color: "#4a4a4a" }}>Always picks the most likely word. "The cat <strong>sat</strong>." Every time.</p>
              </div>
              <div className="p-3" style={{ border: "2px solid #1a1a1a", background: "white" }}>
                <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>Temp = high</div>
                <p className="text-xs" style={{ color: "#4a4a4a" }}>Rolls the dice more fairly. "The cat <strong>philosophized</strong>." More creative, less reliable.</p>
              </div>
            </div>
          </div>

          <p>Temperature is just a knob. It's not the AI "being creative" — it's a setting a human chose.</p>
        </div>
      </div>

      {/* Buzzword Decoder */}
      <div className="mb-12">
        <div className="py-4 px-6 mb-6" style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0 #1a1a1a" }}>
          <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#7ab87a" }}>// Reference</div>
          <h2 className="text-2xl font-black uppercase text-white">Buzzword decoder</h2>
          <p className="text-sm mt-1" style={{ color: "#a8d5a8" }}>What they say vs. what it actually means.</p>
        </div>

        <div className="space-y-3">
          {TERMS.map((term) => (
            <div key={term.word} style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "3px 3px 0 #1a1a1a" }}>
              <div className="px-5 py-2 text-center" style={{ borderBottom: "1px solid #e5e5e5" }}>
                <span className="text-base font-black uppercase tracking-wide" style={{ color: "#1a1a1a" }}>{term.word}</span>
              </div>
              <div className="grid grid-cols-2" style={{ borderColor: "#e5e5e5" }}>
                <div className="px-4 py-3" style={{ borderRight: "1px solid #e5e5e5" }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconMegaphoneX />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#b94a4a" }}>The hype</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>{term.scary}</p>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconTarget />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#2d4a2d" }}>The reality</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#2a2a2a" }}>{term.real}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print CTA */}
      <div className="mb-12 print:hidden">
        <button
          onClick={() => window.print()}
          className="text-xs font-black uppercase tracking-widest px-5 py-3 text-white"
          style={{ background: "#1a1a1a", border: "2px solid #1a1a1a", boxShadow: "3px 3px 0 #2d4a2d", cursor: "pointer" }}
        >
          Save / Print as PDF →
        </button>
      </div>

      {/* Workshop CTA */}
      <div className="p-6 print:hidden" style={{ border: "2px solid #1a1a1a", background: "#f0ece0", boxShadow: "4px 4px 0 #1a1a1a" }}>
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#2d4a2d" }}>// Want more?</div>
        <h2 className="text-lg font-black uppercase mb-3" style={{ color: "#1a1a1a" }}>Come build something.</h2>
        <p className="text-sm mb-4" style={{ color: "#4a4a4a" }}>
          Upcoming in-person East Bay workshops where we go from zero to working AI tools. No hype. Bring your laptop.
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

      <div className="mt-10 pt-8 print:hidden" style={{ borderTop: "2px solid #1a1a1a" }}>
        <Link href="/" className="text-xs font-black uppercase tracking-widest" style={{ color: "#1a1a1a" }}>
          ← Back to home
        </Link>
      </div>

      <style>{`
        @media print {
          body { background: white; }
          .max-w-2xl { max-width: 100%; padding: 0; }
        }
      `}</style>

    </div>
  );
}
