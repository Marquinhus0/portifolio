import { NextResponse } from "next/server";

interface ContactPayload {
  topic?: string;
  workModel?: string;
  senderName?: string;
  senderEmail?: string;
  company?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID_JSON", message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const topic = String(payload.topic || "").trim();
  const workModel = String(payload.workModel || "").trim();
  const senderName = String(payload.senderName || "").trim();
  const senderEmail = String(payload.senderEmail || "").trim();
  const company = String(payload.company || "").trim();
  const message = String(payload.message || "").trim();

  if (!topic || !workModel) {
    return NextResponse.json(
      { ok: false, code: "MISSING_FIELDS", message: "Topic and work model are required." },
      { status: 400 }
    );
  }

  if (senderEmail && !EMAIL_RE.test(senderEmail)) {
    return NextResponse.json(
      { ok: false, code: "INVALID_EMAIL", message: "Reply email format is invalid." },
      { status: 400 }
    );
  }

  if (!message && !senderName && !senderEmail) {
    return NextResponse.json(
      {
        ok: false,
        code: "EMPTY_CONTACT",
        message: "Provide your email or a brief context message before sending.",
      },
      { status: 400 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      {
        ok: false,
        fallbackRequired: true,
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Direct email provider is not configured on this server.",
      },
      { status: 503 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "marcuszhrt@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const subject = `[Portfólio] ${topic} (${workModel})${company ? ` — ${company}` : ""}`;

  const textBody = [
    `Motivo: ${topic}`,
    `Formato: ${workModel}`,
    senderName ? `Nome: ${senderName}` : null,
    senderEmail ? `Email de retorno: ${senderEmail}` : null,
    company ? `Empresa / Time: ${company}` : null,
    "",
    message || `Interesse em conversar sobre ${topic} (${workModel}).`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: senderEmail || undefined,
        subject,
        text: textBody,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          fallbackRequired: true,
          code: "PROVIDER_ERROR",
          message: "Failed to deliver email through provider.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: "resend" });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        fallbackRequired: true,
        code: "NETWORK_ERROR",
        message: "Network error while sending message.",
      },
      { status: 502 }
    );
  }
}
