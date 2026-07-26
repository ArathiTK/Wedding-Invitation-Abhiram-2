import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, attendance } = data;

    const { guestCount } = data;

    if (!name || !attendance) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (!sheetUrl) {
      return NextResponse.json({ message: "Server misconfigured: missing sheet URL" }, { status: 500 });
    }

    const sheetRes = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        guests: guestCount,
        attendance,
        targetTab: "Abhiram",
        timestamp: new Date()
          .toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })
          .replace(" ", "T") + "+05:30",
      }),
    });
    const sheetData = await sheetRes.json().catch(() => ({}));

    if (!sheetRes.ok || sheetData.success === false) {
      return NextResponse.json({ message: sheetData.message || "Failed to record RSVP" }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "RSVP received! Thank you." });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
