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

const LEARN_OPTIONS = [
  "Using AI at work",
  "Building AI products",
  "Understanding how AI works",
  "Keeping up with news",
  "Other",
];

const HEAR_OPTIONS = ["Word of mouth", "Social media", "Search", "In-person event", "Other"];

const AGE_OPTIONS = ["Under 25", "25–34", "35–44", "45–54", "55+"];

const DEV_OPTIONS = [
  "None",
  "A little (scripts / no-code)",
  "Some (hobby projects)",
  "Professional developer",
];

export default function SurveyBar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [learnInterests, setLearnInterests] = useState<string[]>([]);
  const [devExp, setDevExp] = useState("");
  const [hearAbout, setHearAbout] = useState<string[]>([]);

  useEffect(() => {
    const hasAccess = getCookie("nobsai_access") === "1";
    const doneSurvey = getCookie("nobsai_survey_done") === "1";
    setShow(hasAccess && !doneSurvey);
  }, []);

  function toggleLearn(val: string) {
    setLearnInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function toggleHear(val: string) {
    setHearAbout((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (learnInterests.length === 0 || hearAbout.length === 0) return;
    setSending(true);
    await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        ageRange,
        learningInterests: learnInterests,
        devExperience: devExp,
        hearAboutUs: hearAbout.join(", "),
      }),
    });
    setCookie("nobsai_survey_done", "1", 365 * 10);
    setSending(false);
    setSubmitted(true);
    setTimeout(() => setShow(false), 2000);
  }

  function dismiss() {
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderTop: "2px solid #1a1a1a",
        background: "#f0ece0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Collapsed bar */}
      {!open && (
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-sm italic" style={{ fontFamily: "var(--font-fraunces)", color: "#4a4a4a" }}>
            Help us understand who you are — takes 60 seconds.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="btn-press text-xs font-black uppercase px-4 py-2 text-white"
              style={{ background: "#2d4a2d", border: "2px solid #1a1a1a", boxShadow: "2px 2px 0 #1a1a1a" }}
            >
              Tell us about yourself →
            </button>
            <button onClick={dismiss} className="text-lg font-black leading-none" style={{ color: "#6b6b6b" }} aria-label="Dismiss">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Expanded form */}
      {open && (
        <div className="max-w-2xl mx-auto px-6 py-6" style={{ maxHeight: "75vh", overflowY: "auto" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black uppercase tracking-tight" style={{ color: "#1a1a1a" }}>
              A little about you
            </h2>
            <button onClick={dismiss} className="text-xl font-black" style={{ color: "#6b6b6b" }} aria-label="Close">
              ×
            </button>
          </div>

          {submitted ? (
            <p className="text-sm font-black uppercase text-center py-4" style={{ color: "#2d4a2d" }}>
              Thanks! 🌱
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>First name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-sm"
                    style={{ border: "2px solid #1a1a1a", background: "white" }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#6b6b6b" }}>Last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-sm"
                    style={{ border: "2px solid #1a1a1a", background: "white" }}
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>Age range</label>
                <div className="flex flex-wrap gap-2">
                  {AGE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAgeRange(opt)}
                      className="text-xs px-3 py-1.5 font-bold uppercase"
                      style={{
                        border: "2px solid #1a1a1a",
                        background: ageRange === opt ? "#2d4a2d" : "white",
                        color: ageRange === opt ? "white" : "#1a1a1a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* What to learn */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>What would you like to learn about AI? <span style={{ color: "#c0392b" }}>*</span></label>
                <div className="flex flex-wrap gap-2">
                  {LEARN_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleLearn(opt)}
                      className="text-xs px-3 py-1.5 font-bold uppercase"
                      style={{
                        border: "2px solid #1a1a1a",
                        background: learnInterests.includes(opt) ? "#2d4a2d" : "white",
                        color: learnInterests.includes(opt) ? "white" : "#1a1a1a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dev experience */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>Software development experience</label>
                <div className="flex flex-wrap gap-2">
                  {DEV_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDevExp(opt)}
                      className="text-xs px-3 py-1.5 font-bold"
                      style={{
                        border: "2px solid #1a1a1a",
                        background: devExp === opt ? "#2d4a2d" : "white",
                        color: devExp === opt ? "white" : "#1a1a1a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* How did you hear */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#6b6b6b" }}>How did you hear about us? <span style={{ color: "#c0392b" }}>*</span></label>
                <div className="flex flex-wrap gap-2">
                  {HEAR_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleHear(opt)}
                      className="text-xs px-3 py-1.5 font-bold uppercase"
                      style={{
                        border: "2px solid #1a1a1a",
                        background: hearAbout.includes(opt) ? "#2d4a2d" : "white",
                        color: hearAbout.includes(opt) ? "white" : "#1a1a1a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={sending || learnInterests.length === 0 || hearAbout.length === 0}
                className="btn-press w-full py-3 text-sm font-black uppercase text-white"
                style={{
                  background: learnInterests.length === 0 || hearAbout.length === 0 ? "#9a9a9a" : "#2d4a2d",
                  border: "2px solid #1a1a1a",
                  boxShadow: "3px 3px 0 #1a1a1a",
                  cursor: learnInterests.length === 0 || hearAbout.length === 0 ? "not-allowed" : "pointer",
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
