import { ogCard, OG_SIZE } from "../_og/card";

export const alt = "noBSAI Video Library";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Watch",
    title: "The Video Library",
    subtitle:
      "Short, plain-English AI videos. No jargon, no PhD required — just clear explanations.",
  });
}
