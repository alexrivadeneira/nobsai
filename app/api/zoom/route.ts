import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.ZOOM_URL;

  if (!url) {
    return NextResponse.json({ error: "Zoom link not configured" }, { status: 503 });
  }

  return NextResponse.redirect(url);
}
