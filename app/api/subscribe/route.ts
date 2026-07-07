import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(req: NextRequest) {
  const { email, redirect, tag } = await req.json();

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
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      ...(tag ? { tags: [tag] } : {}),
    }),
  });

  const data = await response.json();
  const memberExists = data.title === "Member Exists";
  const ok = response.ok || memberExists;

  if (!ok) {
    return NextResponse.json({ error: data.detail ?? "Something went wrong" }, { status: 500 });
  }

  // Existing members don't get tags from the POST above — apply via the tags endpoint.
  if (tag && memberExists) {
    const subscriberHash = createHash("md5").update(email.toLowerCase()).digest("hex");
    await fetch(`https://${datacenter}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}/tags`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
    });
  }

  const res = NextResponse.json({ success: true, redirect: redirect ?? "/" });
  res.cookies.set("nobsai_email", email, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  res.cookies.set("nobsai_access", "1", {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  return res;
}
