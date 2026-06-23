import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, redirect } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !AUDIENCE_ID) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const datacenter = API_KEY.split("-").pop();

  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, status: "subscribed" }),
  });

  const data = await response.json();
  const ok = response.ok || data.title === "Member Exists";

  if (!ok) {
    return NextResponse.json({ error: data.detail ?? "Something went wrong" }, { status: 500 });
  }

  const res = NextResponse.json({ success: true, redirect: redirect ?? "/" });
  res.cookies.set("nobsai_access", "1", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
  });
  return res;
}
