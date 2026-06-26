"use client";
import { useEffect, useState } from "react";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; samesite=lax`;
}

const LEARN_OPTIONS = ["Using AI at work", "Building AI products", "Understanding how AI works", "Keeping up with news", "Other"];
const HEAR_OPTIONS = ["Word of mouth", "Social media", "Search", "In-person event", "Other"];
const AGE_OPTIONS = ["Under 25", "25–34", "35–44", "45–54", "55+"];
const DEV_OPTIONS = ["None", "A little (scripts / no-code)", "Some (hobby projects)", "Professional developer"];

export default function SurveyInline() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [existingEmail, setExistingEmail] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [learnInterests, setLearnInterests] = useState<string[]>([]);
  const [devExp, setDevExp] = useState("");
  const [hearAbout, setHearAbout] = useState<string[]>([]);

  useEffect(() => {
    const doneSurvey = getCookie("nobsai_survey_done") === "1";
    if (doneSurvey) return;
    const savedEmail = getCookie("nobsai_email");
    setExistingEmail(savedEmail);
    setShow(true);
  }, []);

  function toggleLearn(val: string) {
    setExpanded(true);
    setLearnInterests((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  }

  function toggleHear(val: string) {
    setExpanded(true);
    setHearAbout((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (learnInterests.length === 0 || hearAbout.length === 0) return;
    const emailToUse = existingEmail || email;
    if (!emailToUse) return;
    setSending(true);

    // If not already subscribed, subscribe first
    if (!existingEmail) {
      const subRes = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToUse, redirect: "/" }),
      });
      const subData = await subRes.json();
      if (!subData.success) {
        setSending(false);
        return;
      }
    }

    await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailToUse, firstName, lastName, ageRange, learningInterests: learnInterests, devExperience: devExp, hearAboutUs: hearAbout.join(", ") }),
    });
    setCookie("nobsai_survey_done", "1", 365 * 10);
    setSending(false);
    setSubmitted(true);
    setTimeout(() => setShow(false), 2500);
  }

  if (!show || dismissed) return null;

  return (
    <div
      className="mb-6 overflow-hidden transition-all duration-300"
      style={{ border: "2px solid #2d4a2d", background: "white", boxShadow: "4px 4px 0 #2d4a2d" }}
    >
      {/* Header — always visible */}
      <div
        className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer"
        style={{ background: "#2d4a2d" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div>
          <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#7ab87a" }}>// Help us build something useful</div>
          <p className="text-sm text-white leading-snug" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 400, fontStyle: "italic" }}>
            60 seconds of your time shapes everything we build — who we teach, what we cover, how we grow.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
          <span className="text-xs font-black uppercase text-white opacity-60">{expanded ? "▲" : "▼"}</span>
          <button
            onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
            className="text-white opacity-50 hover:opacity-100 text-lg leading-none font-black"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>

      {/* Expanded form */}
      {expanded && (
        <div className="px-5 py-5">
          {submitted ? (
            <p className="text-sm font-black uppercase text-center py-2" style={{ color: "#2d4a2d" }}>
              Thanks — this means a lot. 🌱
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email — only if not already subscribed */}
              {!existingEmail && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>Email <span style={{ color: "#c0392b" }}>*</span></label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-3 py-2 text-sm" style={{ border: "2px solid #1a1a1a", background: "#f0ece0" }} />
                </div>
              )}

              {/* Name */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>First name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 text-sm" style={{ border: "2px solid #1a1a1a", background: "#f0ece0" }} />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>Last name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 text-sm" style={{ border: "2px solid #1a1a1a", background: "#f0ece0" }} />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>Age range</label>
                <div className="flex flex-wrap gap-2">
                  {AGE_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => { setAgeRange(opt); setExpanded(true); }} className="text-xs px-3 py-1.5 font-bold uppercase" style={{ border: "2px solid #1a1a1a", background: ageRange === opt ? "#2d4a2d" : "white", color: ageRange === opt ? "white" : "#1a1a1a" }}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Learn */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>What would you like to learn about AI? <span style={{ color: "#c0392b" }}>*</span></label>
                <div className="flex flex-wrap gap-2">
                  {LEARN_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => toggleLearn(opt)} className="text-xs px-3 py-1.5 font-bold uppercase" style={{ border: "2px solid #1a1a1a", background: learnInterests.includes(opt) ? "#2d4a2d" : "white", color: learnInterests.includes(opt) ? "white" : "#1a1a1a" }}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Dev */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>Software development experience</label>
                <div className="flex flex-wrap gap-2">
                  {DEV_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => { setDevExp(opt); setExpanded(true); }} className="text-xs px-3 py-1.5 font-bold" style={{ border: "2px solid #1a1a1a", background: devExp === opt ? "#2d4a2d" : "white", color: devExp === opt ? "white" : "#1a1a1a" }}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Hear */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>How did you hear about us? <span style={{ color: "#c0392b" }}>*</span></label>
                <div className="flex flex-wrap gap-2">
                  {HEAR_OPTIONS.map((opt) => (
                    <button key={opt} type="button" onClick={() => toggleHear(opt)} className="text-xs px-3 py-1.5 font-bold uppercase" style={{ border: "2px solid #1a1a1a", background: hearAbout.includes(opt) ? "#2d4a2d" : "white", color: hearAbout.includes(opt) ? "white" : "#1a1a1a" }}>{opt}</button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={sending || learnInterests.length === 0 || hearAbout.length === 0 || (!existingEmail && !email)}
                className="w-full py-3 text-sm font-black uppercase text-white"
                style={{
                  background: (learnInterests.length === 0 || hearAbout.length === 0 || (!existingEmail && !email)) ? "#9a9a9a" : "#2d4a2d",
                  border: "2px solid #1a1a1a", boxShadow: "3px 3px 0 #1a1a1a",
                  cursor: (learnInterests.length === 0 || hearAbout.length === 0 || (!existingEmail && !email)) ? "not-allowed" : "pointer"
                }}
              >
                {sending ? "Saving..." : "Submit →"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
