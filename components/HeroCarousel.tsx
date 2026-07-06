"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = {
  _id: string;
  label: string | null;
  headline: string;
  subtext: string | null;
  linkLabel: string | null;
  linkUrl: string | null;
  image: string | null;
};

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "clamp(280px, 50vw, 360px)", border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured announcements"
    >
      {slides.map((slide, i) => (
        <div
          key={slide._id}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          aria-hidden={i !== index}
        >
          {slide.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
            {slide.label && (
              <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#7ab87a" }}>
                {"// "}{slide.label}
              </div>
            )}
            <h2 className="text-white text-2xl leading-snug mb-2" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700 }}>
              {slide.headline}
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
              {slide.subtext}{" "}
              {slide.linkLabel && slide.linkUrl && (
                <a href={slide.linkUrl} className="underline font-bold text-white hover:opacity-80">
                  {slide.linkLabel} →
                </a>
              )}
            </p>
          </div>
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center font-black text-lg hover:opacity-80"
            style={{ background: "#f0ece0", border: "2px solid #1a1a1a", boxShadow: "2px 2px 0px #1a1a1a", color: "#1a1a1a" }}
          >
            ←
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center font-black text-lg hover:opacity-80"
            style={{ background: "#f0ece0", border: "2px solid #1a1a1a", boxShadow: "2px 2px 0px #1a1a1a", color: "#1a1a1a" }}
          >
            →
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide._id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="w-3 h-3"
                style={{
                  background: i === index ? "#7ab87a" : "rgba(255,255,255,0.5)",
                  border: "1px solid #1a1a1a",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
