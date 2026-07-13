"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  term?: string;
  definition?: string;
  moreUrl?: string;
  children: React.ReactNode;
};

export default function VocabTerm({ term, definition, moreUrl, children }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // If the reference wasn't resolved, render plain text rather than a broken button
  if (!definition) return <>{children}</>;

  return (
    <span ref={wrapRef} style={{ position: "relative", display: "inline" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Definition of ${term ?? "term"}`}
        style={{
          all: "unset",
          cursor: "pointer",
          color: "#2d4a2d",
          fontWeight: 600,
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
        }}
      >
        {children}
      </button>
      {open && (
        <span
          role="dialog"
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(280px, 80vw)",
            display: "block",
            background: "#f0ece0",
            border: "2px solid #1a1a1a",
            boxShadow: "4px 4px 0 #1a1a1a",
            padding: "0.85rem 1rem",
            fontSize: "0.875rem",
            lineHeight: 1.55,
            color: "#2a2a2a",
            fontStyle: "normal",
            fontFamily: "var(--font-sans, inherit)",
            textAlign: "left",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#2d4a2d",
              marginBottom: "0.35rem",
            }}
          >
            {`// ${term ?? "Vocab"}`}
          </span>
          {definition}
          {moreUrl && (
            <a
              href={moreUrl}
              style={{
                display: "block",
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#2d4a2d",
                textDecoration: "underline",
              }}
            >
              Learn more →
            </a>
          )}
        </span>
      )}
    </span>
  );
}
