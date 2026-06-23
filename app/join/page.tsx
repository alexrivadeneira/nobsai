"use client";
import { useState } from "react";
import Image from "next/image";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/read/how-to-explain-ai";
    } else {
      setStatus("error");
      setError(data.error ?? "Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: "#f0ece0" }}>
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <Image src="/logo.png" alt="NoBSAI" width={56} height={56} className="object-contain" />
          <div>
            <div className="font-black text-xl uppercase tracking-tight" style={{ color: "#1a1a1a" }}>NoBSAI</div>
            <div className="text-xs uppercase tracking-widest" style={{ color: "#2d4a2d" }}>No Bloat, Straight AI</div>
          </div>
        </div>

        {/* Card */}
        <div style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "6px 6px 0 #1a1a1a" }}>
          <div className="p-8" style={{ borderBottom: "2px solid #1a1a1a", background: "#2d4a2d" }}>
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#7ab87a" }}>// Free Guide</div>
            <h1 className="text-2xl font-black uppercase leading-tight text-white">
              How to Explain AI to Anyone — Without Sounding Like a Nerd
            </h1>
          </div>

          <div className="p-8">
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4a4a" }}>
              Drop your email and get instant access to the guide — plus be first to hear about upcoming in-person AI workshops in the East Bay.
            </p>

            <ul className="space-y-2 mb-8">
              {[
                "Plain-English explanations that actually land",
                "No jargon, no hype, no PhD required",
                "Real examples you can use today",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#2a2a2a" }}>
                  <span className="font-black mt-0.5" style={{ color: "#2d4a2d" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>

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
                {status === "loading" ? "Sending..." : "Get the Free Guide →"}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-600">{error}</p>
              )}
            </form>

            <p className="text-xs mt-4" style={{ color: "#9a9a9a" }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
