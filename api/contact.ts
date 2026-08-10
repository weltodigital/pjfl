import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/** Where enquiries land. */
const TO = "info@pjfl.co.uk";

/**
 * Sender address. Must be on a domain verified in Resend, otherwise the send
 * is rejected. Before pjfl.co.uk is verified you can set CONTACT_FROM to
 * "onboarding@resend.dev" to test the flow end to end.
 */
const FROM = process.env.CONTACT_FROM || "PJFL Website <website@pjfl.co.uk>";

const LIMITS = {
  name: 100,
  email: 150,
  phone: 40,
  service: 80,
  message: 5000,
} as const;

const asField = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({
      error: "The contact form isn't configured yet. Please email us directly.",
    });
  }

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) ?? {};

  // Honeypot: a field hidden from humans. Anything that fills it is a bot, so
  // accept the request and quietly bin it rather than tipping the bot off.
  if (asField(body.company, 100)) {
    return res.status(200).json({ ok: true });
  }

  const name = asField(body.name, LIMITS.name);
  const email = asField(body.email, LIMITS.email);
  const phone = asField(body.phone, LIMITS.phone);
  const service = asField(body.service, LIMITS.service);
  const message = asField(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Please fill in your name, email address and message." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Service of interest", service || "Not specified"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1f2937">
      <h2 style="color:#345e7d;margin:0 0 16px">New website enquiry</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top">${label}</td>
            <td style="padding:6px 0;font-weight:600">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:0 0 6px;color:#6b7280">Message</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // so hitting Reply goes straight back to the enquirer
      subject: `Website enquiry — ${service || "General"} — ${name}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend rejected the send:", error);
      return res.status(502).json({
        error: "We couldn't send your message just now. Please email us directly.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending enquiry:", err);
    return res.status(500).json({
      error: "Something went wrong sending your message. Please email us directly.",
    });
  }
}
