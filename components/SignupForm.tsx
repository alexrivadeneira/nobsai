"use client";

import { useState } from "react";

type Props = {
  cta?: string | null;
  redirect: string;
  note?: string | null;
  tag?: string | null;
};

export default function SignupForm({ cta, redirect, note, tag }: Props) {
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
      body: JSON.stringify({ email, redirect, tag }),
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
    <div className="my-8 p-6" style={{ border: "2px solid #1a1a1a", background: "white", boxShadow: "4px 4px 0 #1a1a1a" }}>
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
          className="btn-press w-full py-3 text-sm font-black uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "3px 3px 0px #1a1a1a" }}
        >
          {status === "loading" ? "Sending..." : (cta || "Count me in →")}
        </button>
        {status === "error" && <p className="text-xs text-red-600">{error}</p>}
      </form>
      {note && <p className="text-xs mt-3" style={{ color: "#9a9a9a" }}>{note}</p>}
    </div>
  );
}
