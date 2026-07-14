import { ogCard, OG_SIZE } from "../_og/card";
import { client } from "@/sanity/lib/client";

export const alt = "noBSAI — AI News Digest";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 60;

function formatDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default async function Image() {
  const latest = await client.fetch<{ date: string; topSummary: string | null } | null>(
    `*[_type == "digest"] | order(date desc)[0]{ date, topSummary }`
  );
  const dateLabel = latest?.date ? formatDate(latest.date) : null;
  return ogCard({
    eyebrow: dateLabel ? `Daily Digest · ${dateLabel}` : "Daily Digest",
    title: "AI News, Minus the Hype",
    subtitle:
      latest?.topSummary?.slice(0, 160) ??
      "A daily, plain-English digest of what actually matters in AI.",
  });
}
