interface EmailTemplateOptions {
  applicationId: string;
  serviceName: string;
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  message?: string;
  attachmentNames: string[];
  submittedAt: string; // formatted date string
}

export function generateEmailHTML(opts: EmailTemplateOptions): string {
  const {
    applicationId,
    serviceName,
    fullName,
    mobile,
    email,
    address,
    message,
    attachmentNames,
    submittedAt,
  } = opts;

  const attachmentList = attachmentNames.length > 0
    ? attachmentNames.map(name => `
        <tr>
          <td style="padding: 6px 12px; border-bottom: 1px solid #f0f0f0;">
            <span style="color: #16a34a; font-size: 16px; margin-right: 8px;">✔</span>
            <span style="font-size: 14px; color: #374151;">${escapeHtml(name)}</span>
          </td>
        </tr>`).join('')
    : '<tr><td style="padding: 8px 12px; color: #9ca3af; font-size: 14px;">No attachments</td></tr>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New ${escapeHtml(serviceName)} Application — Bhanu Cyber Cafe</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb, #6366f1); border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
              <div style="display: inline-block; background: rgba(255,255,255,0.15); border-radius: 12px; padding: 8px 20px; margin-bottom: 12px;">
                <span style="color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Bhanu Cyber Cafe</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">New Application Received</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px;">${escapeHtml(serviceName)}</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background: #ffffff; padding: 0 40px 32px;">

              <!-- Application ID Banner -->
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px 20px; margin: 28px 0 24px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Application ID</p>
                <p style="margin: 0; font-size: 22px; font-weight: 700; color: #2563eb; letter-spacing: 1px;">${escapeHtml(applicationId)}</p>
                <p style="margin: 6px 0 0; font-size: 12px; color: #9ca3af;">Submitted: ${escapeHtml(submittedAt)}</p>
              </div>

              <!-- Customer Details -->
              <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Customer Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr style="background: #f9fafb;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6b7280; width: 40%; border-bottom: 1px solid #f0f0f0;">Service</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #f0f0f0;"><strong>${escapeHtml(serviceName)}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #f0f0f0;">Full Name</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #f0f0f0;">${escapeHtml(fullName)}</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #f0f0f0;">Mobile</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #f0f0f0;">${escapeHtml(mobile)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6b7280; border-bottom: 1px solid #f0f0f0;">Email</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #f0f0f0;">${escapeHtml(email)}</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6b7280;">Address</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #111827;">${escapeHtml(address)}</td>
                </tr>
              </table>

              ${message ? `
              <!-- Customer Message -->
              <h2 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Additional Message</h2>
              <div style="background: #f9fafb; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; padding: 14px 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6;">${escapeHtml(message)}</p>
              </div>` : ''}

              <!-- Attachments -->
              <h2 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Attached Documents <span style="font-size: 13px; color: #6b7280; font-weight: 400;">(${attachmentNames.length} file${attachmentNames.length !== 1 ? 's' : ''})</span>
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                ${attachmentList}
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px; padding: 20px 40px; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #374151;">Bhanu Cyber Cafe</p>
              <p style="margin: 0 0 4px; font-size: 12px; color: #9ca3af;">Main Road, City Center — bhanucafe.in</p>
              <p style="margin: 12px 0 0; font-size: 11px; color: #d1d5db;">This email was generated automatically from the website. Do not reply to this email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
