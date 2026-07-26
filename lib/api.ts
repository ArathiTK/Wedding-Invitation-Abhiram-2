export interface RSVPData {
  name: string;
  guestCount: number;
  attendance: "ceremony" | "reception" | "both" | "decline";
}

export async function submitRSVP(data: RSVPData): Promise<{ success: boolean; message: string }> {
  const res = await fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Submission failed");
  }
  return res.json();
}
