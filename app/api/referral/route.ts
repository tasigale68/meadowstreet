import { NextResponse } from "next/server";

const TITUS_EDGE_FN = "https://mptaztzpzvpaebdaqodt.supabase.co/functions/v1/public-referral";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.participant_name?.trim()) {
      return NextResponse.json(
        { error: "Participant name is required" },
        { status: 400 }
      );
    }

    // Map form fields → Titus CRM referrals table columns
    const payload = {
      participant_name: body.participant_name.trim(),
      participant_email: body.contact_email?.trim() || null,
      participant_phone: body.contact_phone?.trim() || null,
      ndis_number: body.ndis_number?.trim() || null,
      service_type: body.support_type || [],
      referrer_name: body.coordinator_name?.trim() || null,
      referrer_email: body.coordinator_email?.trim() || null,
      notes: body.message?.trim() || null,
    };

    const res = await fetch(TITUS_EDGE_FN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Titus edge fn error:", data);
      return NextResponse.json(
        { error: "Failed to submit referral. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
