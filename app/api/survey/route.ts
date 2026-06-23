import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, ageRange, learningInterests, devExperience, hearAboutUs } = await req.json();

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !AUDIENCE_ID) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const datacenter = API_KEY.split("-").pop();
  const emailToUse = email || req.cookies.get("nobsai_email")?.value;

  if (!emailToUse) {
    return NextResponse.json({ error: "No email found" }, { status: 400 });
  }

  const subscriberHash = createHash("md5").update(emailToUse.toLowerCase()).digest("hex");
  // Mailchimp requires MD5 hash — use a PATCH to update merge fields on existing subscriber
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merge_fields: {
        FNAME: firstName ?? "",
        LNAME: lastName ?? "",
        AGE: ageRange ?? "",
        LEARN: Array.isArray(learningInterests) ? learningInterests.join(", ") : (learningInterests ?? ""),
        DEVEXP: devExperience ?? "",
        HEARABT: hearAboutUs ?? "",
      },
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    return NextResponse.json({ error: data.detail ?? "Failed to save survey" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
