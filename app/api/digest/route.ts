import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

type IncomingItem = {
  headline?: string;
  summary?: string;
  url?: string;
  source?: string;
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-digest-secret");
  if (!process.env.DIGEST_SECRET || secret !== process.env.DIGEST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: "Digest not configured" }, { status: 503 });
  }

  const { date, items } = (await req.json()) as { date?: string; items?: IncomingItem[] };

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date must be YYYY-MM-DD" }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "items must be a non-empty array" }, { status: 400 });
  }
  const invalid = items.some((i) => !i.headline?.trim());
  if (invalid) {
    return NextResponse.json({ error: "every item needs a headline" }, { status: 400 });
  }

  // Deterministic ID per day: re-posting the same day replaces rather than duplicates.
  const doc = {
    _id: `digest-${date}`,
    _type: "digest",
    date,
    items: items.map((i, idx) => ({
      _type: "digestItem",
      _key: `item-${idx}`,
      headline: i.headline!.trim(),
      summary: i.summary?.trim() ?? "",
      url: i.url ?? "",
      source: i.source ?? "",
    })),
  };

  await writeClient.createOrReplace(doc);

  return NextResponse.json({ ok: true, id: doc._id, itemCount: doc.items.length });
}
