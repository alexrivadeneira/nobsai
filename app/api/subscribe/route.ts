import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
  const datacenter = API_KEY.split("-").pop(); // e.g. us21

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
    }),
  });

  const data = await response.json();

  if (response.ok) {
    return NextResponse.json({ success: true });
  }

  // Already subscribed is fine — still redirect them
  if (data.title === "Member Exists") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: data.detail ?? "Something went wrong" }, { status: 500 });
}
