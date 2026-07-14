import { ImageResponse } from "next/og";

// Shared 1200x630 Open Graph card renderer for Working Knowledge AI.
// Produces a branded, neo-brutalist card given an eyebrow/title/subtitle.
// Brand fonts (Fraunces + Inter) are loaded at render time from Google Fonts;
// if that fetch fails (e.g. no network at build), it falls back to the
// bundled default font so image generation never breaks the build.

export const OG_SIZE = { width: 1200, height: 630 };

const CREAM = "#f5f0e8";
const INK = "#1a1a1a";
const ORANGE = "#e8a33d";
const GREEN = "#1e3a26";
const MUTE = "#4a4a4a";
const FAINT = "#8a7a5a";

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());
  const src = css.match(/src:\s*url\(([^)]+)\)\s*format/)?.[1];
  if (!src) throw new Error(`Could not parse font src for ${family}`);
  return fetch(src).then((r) => r.arrayBuffer());
}

type CardInput = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export async function ogCard({ eyebrow, title, subtitle }: CardInput) {
  const text = `${eyebrow}${title}${subtitle ?? ""}Working Knowledge AIworkingknowledge.ai`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fonts: any[] = [];
  try {
    const [display, body] = await Promise.all([
      loadGoogleFont("Fraunces", 900, text),
      loadGoogleFont("Inter", 500, text),
    ]);
    fonts = [
      { name: "Fraunces", data: display, weight: 900, style: "normal" },
      { name: "Inter", data: body, weight: 500, style: "normal" },
    ];
  } catch {
    fonts = [];
  }

  const bodyFamily = fonts.length ? "Inter" : undefined;
  const displayFamily = fonts.length ? "Fraunces" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          padding: 20,
          fontFamily: bodyFamily,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: CREAM,
            padding: 64,
          }}
        >
          {/* eyebrow */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                background: GREEN,
                color: CREAM,
                fontSize: 24,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 2,
                padding: "10px 20px",
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* title + subtitle */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: displayFamily,
                fontSize: 84,
                fontWeight: 900,
                color: INK,
                lineHeight: 1.02,
                letterSpacing: -2,
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 24,
                  fontSize: 32,
                  color: MUTE,
                  lineHeight: 1.3,
                  maxWidth: 940,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          {/* footer wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: displayFamily,
                fontSize: 46,
                fontWeight: 900,
                color: INK,
              }}
            >
              <span>Working Knowledge </span>
              <span style={{ color: ORANGE }}>AI</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: FAINT,
              }}
            >
              workingknowledge.ai
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
