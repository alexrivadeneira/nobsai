"use client";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DEFAULTS = {
  label: "Free community",
  headline: "AI without hype!",
  body: "Every AI headline promises to change your life. We skip that part. NoBSAI is for people who want to actually understand how AI works — starting from the fundamentals, in plain English, with no marketing fluff.",
  bullets: [
    "What words like \"model\", \"token\", and \"prompt\" actually mean",
    "How to build real tools without a CS degree or PhD",
    "In-person East Bay workshops where we build stuff together",
  ],
  cta: "Count me in →",
  redirect: "/read/how-to-explain-ai",
};

function JoinForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const label = params.get("label") ?? DEFAULTS.label;
  const headline = params.get("headline") ?? DEFAULTS.headline;
  const body = params.get("body") ?? DEFAULTS.body;
  const cta = params.get("cta") ?? DEFAULTS.cta;
  const redirect = params.get("redirect") ?? DEFAULTS.redirect;
  const showGuide = params.get("guide") === "true";

  // bullets param: absent = defaults, "false"/"none" = hidden, "a|b|c" = custom list
  const bulletsParam = params.get("bullets");
  const bullets =
    bulletsParam === "false" || bulletsParam === "none"
      ? []
      : bulletsParam
        ? bulletsParam.split("|").map((b) => b.trim()).filter(Boolean)
        : DEFAULTS.bullets;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, redirect }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = data.redirect;
    } else {
      setStatus("error");
      setError(data.error ?? "Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: "#f0ece0" }}>
      <div className="w-full max-w-lg">

{showGuide && (
          <div className="mb-6 flex gap-5 items-center">
            <Image src="/guide-icon.png" alt="Free guide" width={80} height={80} className="object-contain flex-shrink-0" />
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#2d4a2d" }}>// Free guide</div>
              <p className="text-sm font-bold leading-snug" style={{ color: "#1a1a1a" }}>AI Without the Magic</p>
              <p className="text-xs mt-1" style={{ color: "#4a4a4a" }}>Drop your email and we'll send it right over.</p>
            </div>
          </div>
        )}

        <div style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "6px 6px 0 #1a1a1a" }}>
          <div className="p-8" style={{ borderBottom: "2px solid #1a1a1a", background: "#2d4a2d" }}>
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#7ab87a" }}>// {label}</div>
            <h1 className="text-2xl leading-tight text-white" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>{headline}</h1>
          </div>

          <div className="p-8">
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4a4a" }}>{body}</p>

            {bullets.length > 0 && (
              <ul className="space-y-2 mb-8">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#2a2a2a" }}>
                    <span className="font-black mt-0.5" style={{ color: "#2d4a2d" }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ border: "2px solid #1a1a1a", background: "#f0ece0" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 text-sm font-black uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                style={{ background: "#2d4a2d", border: "2px solid #1a1a1a" }}
              >
                {status === "loading" ? "Sending..." : cta}
              </button>
              {status === "error" && <p className="text-xs text-red-600">{error}</p>}
            </form>

            <p className="text-xs mt-4" style={{ color: "#9a9a9a" }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
}
