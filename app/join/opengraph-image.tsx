import { ogCard, OG_SIZE } from "../_og/card";

export const alt = "Free guide: Explain AI to Anyone";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "Free guide",
    title: "Explain AI to Anyone",
    subtitle:
      "A free, plain-English guide to understanding and talking about AI with confidence.",
  });
}
