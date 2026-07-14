import { ogCard, OG_SIZE } from "./_og/card";

export const alt = "Working Knowledge AI — AI without the hype";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    eyebrow: "East Bay AI education",
    title: "AI without the hype.",
    subtitle:
      "Plain-English AI education for East Bay locals. A free guide, in-person workshops, and Saturday office hours.",
  });
}
