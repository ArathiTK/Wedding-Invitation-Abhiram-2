import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, attendance } = data;

    if (!name || !attendance) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Log RSVP to console (Vercel logs) — replace with email/DB integration as needed
    console.log("RSVP Received:", {
      name,
      attendance,
      timestamp: new Date().toISOString(),
    });

    // Optional: send to Google Sheets or email via environment variable hooks
    // For now, a simple success response
    return NextResponse.json({ success: true, message: "RSVP received! Thank you." });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
