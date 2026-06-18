const RESEND_API_URL = "https://api.resend.com/emails";

function getSiteUrl() {
  return process.env.PUBLIC_SITE_URL || "https://projenius.in";
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || "ProJenius <newsletter@projenius.in>";
}

export function createBlogEmail(blog) {
  const url = `${getSiteUrl().replace(/\/$/, "")}/blog/${blog.slug}`;
  const category = blog.tags?.[0] || "Technology";
  const thumbnail = blog.thumbnailUrl
    ? `
      <img
        alt="${blog.title}"
        src="${blog.thumbnailUrl}"
        style="display:block;width:100%;height:auto;border:0"
      />
    `
    : "";

  return `
    <div style="margin:0;padding:0;background:#f3f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">
        New ProJenius article: ${blog.title}
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f7fb;margin:0;padding:28px 12px">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #dce8f1;border-radius:18px;overflow:hidden">
              <tr>
                <td style="background:#07142c;padding:26px 30px">
                  <p style="margin:0 0 6px;color:#8beeff;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase">
                    ProJenius Insights
                  </p>
                  <p style="margin:0;color:#ffffff;font-size:20px;font-weight:800;line-height:1.3">
                    New article from ProJenius
                  </p>
                </td>
              </tr>

              ${
                thumbnail
                  ? `<tr><td style="background:#eaf4f8">${thumbnail}</td></tr>`
                  : ""
              }

              <tr>
                <td style="padding:34px 30px 30px">
                  <p style="margin:0 0 12px;color:#0b8eaa;font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase">
                    ${category}
                  </p>
                  <h1 style="margin:0 0 14px;color:#07142c;font-size:30px;line-height:1.18;font-weight:900">
                    ${blog.title}
                  </h1>
                  <p style="margin:0 0 24px;color:#5c6878;font-size:16px;line-height:1.7">
                    ${blog.description}
                  </p>
                  <table role="presentation" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="background:#07142c;border-radius:8px">
                        <a href="${url}" style="display:inline-block;padding:13px 20px;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none">
                          Read the article
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="border-top:1px solid #e4eef5;padding:22px 30px 28px">
                  <p style="margin:0 0 8px;color:#07142c;font-size:14px;font-weight:800">
                    ProJenius Innovation Technology
                  </p>
                  <p style="margin:0;color:#7a8796;font-size:13px;line-height:1.6">
                    You are receiving this email because you subscribed to ProJenius blog and newsletter updates.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function createSubscriptionEmail() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  return `
    <div style="margin:0;padding:0;background:#f3f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">
        You are now subscribed to the ProJenius newsletter.
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f7fb;margin:0;padding:28px 12px">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dce8f1;border-radius:18px;overflow:hidden">
              <tr>
                <td style="background:#07142c;padding:28px 30px">
                  <p style="margin:0 0 8px;color:#8beeff;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase">
                    ProJenius Newsletter
                  </p>
                  <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:900">
                    You are subscribed
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 30px">
                  <p style="margin:0 0 14px;color:#07142c;font-size:16px;font-weight:800">
                    Welcome to ProJenius Insights.
                  </p>
                  <p style="margin:0 0 20px;color:#5c6878;font-size:16px;line-height:1.7">
                    Thank you for subscribing. You will receive selected updates on technology, AI, IoT, product development, and practical digital growth strategies from ProJenius.
                  </p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;border:1px solid #e4eef5;border-radius:12px;background:#f8fbfd">
                    <tr>
                      <td style="padding:18px 20px">
                        <p style="margin:0 0 6px;color:#07142c;font-size:14px;font-weight:800">What to expect</p>
                        <p style="margin:0;color:#6b7788;font-size:14px;line-height:1.6">
                          Corporate blog articles, company updates, and useful technology notes. No unnecessary noise.
                        </p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="background:#07142c;border-radius:8px">
                        <a href="${siteUrl}/blog" style="display:inline-block;padding:13px 20px;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none">
                          Visit ProJenius Blog
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="border-top:1px solid #e4eef5;padding:22px 30px 28px">
                  <p style="margin:0 0 8px;color:#07142c;font-size:14px;font-weight:800">
                    ProJenius Innovation Technology
                  </p>
                  <p style="margin:0;color:#7a8796;font-size:13px;line-height:1.6">
                    This confirmation was sent because your email was used to subscribe to ProJenius newsletter updates.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is missing. Skipping email send.");
    return { skipped: true };
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${detail}`);
  }

  return response.json();
}
