import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";

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

    after(async () => {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            guests: guestCount,
            attendance,
            targetTab: "Abhiram",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("RSVP sheet webhook failed:", err);
      }
    });

    return NextResponse.json({ success: true, message: "RSVP received! Thank you." });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
