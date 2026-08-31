import nodemailer from "nodemailer";
import { getCompanyDetails } from "./content-db";

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notificationEmail: string;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from = process.env.SMTP_FROM || `"K2 Pest Control" <${user}>`;
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || user;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    notificationEmail,
  };
}

function createTransporter(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

/**
 * Send an alert notification email to the admin/dispatch team when a new lead is captured.
 */
export async function sendLeadNotificationEmail(lead: {
  id?: string;
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  service?: string | null;
  message?: string | null;
  source?: string;
}) {
  const config = getSmtpConfig();

  if (!config) {
    console.info(
      "ℹ️ [SMTP Notice]: SMTP credentials not yet provided in .env (SMTP_HOST, SMTP_USER, SMTP_PASS). Skipping email dispatch."
    );
    return { success: false, reason: "SMTP not configured" };
  }

  const company = await getCompanyDetails().catch(() => ({ name: "K2 Pest Control" }));
  const transporter = createTransporter(config);

  const isChatbot =
    lead.source === "AI Chatbot" ||
    (lead.message && lead.message.includes("[Captured via AI Chatbot]"));

  const sourceLabel = isChatbot ? "🤖 AI Chatbot Assistant" : "📝 Website Contact Form";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #1c1917; padding: 20px 24px; text-align: left;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;">
          🚨 New Customer Lead Received
        </h2>
        <p style="color: #a8a29e; margin: 4px 0 0 0; font-size: 13px;">
          ${company.name || "K2 Pest Control"} CRM Notification &bull; Source: ${sourceLabel}
        </p>
      </div>

      <div style="padding: 24px;">
        <div style="background-color: #fef2f2; border-left: 4px solid #BE2320; padding: 14px 16px; margin-bottom: 20px; border-radius: 4px;">
          <strong style="color: #991b1b; font-size: 15px; display: block;">Customer: ${lead.name}</strong>
          <span style="color: #7f1d1d; font-size: 14px;">Phone: <a href="tel:${lead.phone}" style="color: #BE2320; font-weight: bold; text-decoration: none;">${lead.phone}</a></span>
          ${lead.email ? `<br><span style="color: #7f1d1d; font-size: 13px;">Email: <a href="mailto:${lead.email}" style="color: #991b1b;">${lead.email}</a></span>` : ""}
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 8px 0; color: #78716c; width: 140px; font-weight: bold;">Service Requested:</td>
            <td style="padding: 8px 0; color: #1c1917; font-weight: 600;">${lead.service || "General Pest Inspection"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 8px 0; color: #78716c; font-weight: bold;">Location / City:</td>
            <td style="padding: 8px 0; color: #1c1917;">${lead.city || "Saskatoon & Area (Not specified)"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 8px 0; color: #78716c; font-weight: bold;">Lead Source:</td>
            <td style="padding: 8px 0; color: #1c1917;">${sourceLabel}</td>
          </tr>
        </table>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #1c1917; font-size: 15px; margin: 0 0 8px 0; font-weight: bold;">Customer Notes / Description:</h3>
          <div style="background-color: #f5f5f4; border: 1px solid #e7e5e4; border-radius: 6px; padding: 12px; font-size: 14px; line-height: 1.5; color: #292524; white-space: pre-wrap;">
            ${lead.message || "No additional details provided by customer."}
          </div>
        </div>

        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f0f0f0;">
          <a href="https://k2pc.ca/admin/messages" style="display: inline-block; background-color: #BE2320; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 14px;">
            Open Lead in K2PC Admin &rarr;
          </a>
        </div>
      </div>

      <div style="background-color: #1c1917; padding: 16px 24px; text-align: center; font-size: 12px; color: #a8a29e;">
        &copy; ${new Date().getFullYear()} ${company.name || "K2 Pest Control"}. All rights reserved.<br>
        Saskatchewan Ministry of Environment Licensed & Insured.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.notificationEmail,
      subject: `🚨 New Lead: ${lead.name} (${lead.service || "Pest Service"})`,
      html: htmlContent,
      replyTo: lead.email || undefined,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send lead email notification:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send an email reply from the admin panel directly to a customer.
 */
export async function sendLeadReplyEmail(params: {
  to: string;
  toName: string;
  subject: string;
  replyMessage: string;
  originalMessage?: string | null;
}) {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error(
      "SMTP is not configured yet. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in your .env file."
    );
  }

  const company = await getCompanyDetails().catch(() => ({
    name: "K2 Pest Control",
    phone: "(306) 407-0007",
  }));

  const transporter = createTransporter(config);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #BE2320; padding: 20px 24px; text-align: left;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;">
          ${company.name || "K2 Pest Control"}
        </h2>
        <p style="color: #fee2e2; margin: 4px 0 0 0; font-size: 13px;">
          Licensed & Guaranteed Pest Control &bull; Saskatchewan
        </p>
      </div>

      <div style="padding: 24px;">
        <p style="font-size: 15px; color: #1c1917; margin-top: 0;">
          Hello <strong>${params.toName}</strong>,
        </p>

        <div style="font-size: 14px; line-height: 1.6; color: #292524; white-space: pre-wrap; margin: 16px 0;">
          ${params.replyMessage}
        </div>

        <div style="background-color: #fafaf9; border-left: 4px solid #BE2320; padding: 12px 16px; margin: 24px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 13px; color: #44403c;">
            <strong>Need urgent assistance or 2-hour emergency dispatch?</strong><br>
            Call our team directly at <strong>${company.phone || "(306) 407-0007"}</strong>.
          </p>
        </div>

        ${
          params.originalMessage
            ? `
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f5f5f4;">
            <p style="font-size: 12px; color: #78716c; margin: 0 0 6px 0; font-weight: bold;">Your original inquiry:</p>
            <div style="font-size: 12px; color: #78716c; background-color: #f5f5f4; padding: 10px; border-radius: 6px; white-space: pre-wrap;">
              ${params.originalMessage}
            </div>
          </div>
        `
            : ""
        }
      </div>

      <div style="background-color: #1c1917; padding: 16px 24px; text-align: center; font-size: 12px; color: #a8a29e;">
        &copy; ${new Date().getFullYear()} ${company.name || "K2 Pest Control"}. All rights reserved.<br>
        Saskatchewan Ministry of Environment Licensed & Insured.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: config.from,
    to: params.to,
    subject: params.subject,
    html: htmlContent,
  });

  return { success: true };
}
