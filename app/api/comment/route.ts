import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: NextRequest) {
  const hasAccess = req.cookies.get("nobsai_access")?.value === "1";
  if (!hasAccess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postSlug, name, body } = await req.json();
  const email = req.cookies.get("nobsai_email")?.value ?? "";

  if (!postSlug || !name || !body?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: "Comments not configured" }, { status: 503 });
  }

  await writeClient.create({
    _type: "comment",
    postSlug,
    name,
    email,
    body,
    approved: false,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
