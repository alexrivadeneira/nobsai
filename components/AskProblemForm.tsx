"use client";

import { useState } from "react";

export default function AskProblemForm() {
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, email }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("sent");
    } else {
      setStatus("error");
      setError(data.error ?? "Something went wrong. Try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="p-6" style={{ border: "2px solid #1a1a1a", background: "#f0ece0", boxShadow: "4px 4px 0 #1a1a1a" }}>
        <p className="font-black text-sm uppercase tracking-wide" style={{ color: "#2d4a2d" }}>Got it — thanks!</p>
        <p className="text-sm mt-1" style={{ color: "#4a4a4a" }}>I&apos;ll email you when it&apos;s answered.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        required
        rows={5}
        placeholder="e.g. I run a small landscaping business and spend 2 hours a week writing quotes from voicemails..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full px-4 py-3 text-sm outline-none resize-y"
        style={{ border: "2px solid #1a1a1a", background: "#f0ece0", color: "#1a1a1a" }}
      />
      <input
        type="email"
        required
        placeholder="Your email (so I can tell you when it's answered)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 text-sm outline-none"
        style={{ border: "2px solid #1a1a1a", background: "#f0ece0", color: "#1a1a1a" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-press text-sm font-black px-6 py-3 transition-opacity hover:opacity-90"
        style={{ background: "#e8a33d", color: "#1a1a1a", border: "2px solid #1a1a1a", boxShadow: "4px 4px 0px #1a1a1a", fontFamily: "monospace" }}
      >
        {status === "loading" ? "Sending..." : "Send it →"}
      </button>
      {status === "error" && <p className="text-xs" style={{ color: "#e8a33d" }}>{error}</p>}
    </form>
  );
}
