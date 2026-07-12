import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: NextRequest) {
  const { question, email } = await req.json();

  if (!question?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: "Questions not configured" }, { status: 503 });
  }

  await writeClient.create({
    _type: "aiQuestion",
    question: question.trim(),
    email: email.trim(),
    answered: false,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
