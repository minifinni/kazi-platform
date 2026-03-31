import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? 'placeholder');

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await getResend().emails.send({
      from: 'Kazi Manufacturing <admin@kazimanufacturing.com>',
      to: email,
      subject: 'Welcome to Kazi Manufacturing!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Kazi Manufacturing</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #dc2626; padding: 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">KAZI MANUFACTURING</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Premium Garment Production in Nepal</p>
                    </td>
                  </tr>
                  
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px;">Welcome aboard, ${name || 'there'}!</h2>
                      
                      <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Your account has been created successfully. You're now part of the Kazi Manufacturing family — where quality meets ethical production.
                      </p>
                      
                      <div style="background-color: #f9fafb; border-left: 4px solid #dc2626; padding: 20px; margin: 30px 0;">
                        <h3 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px;">What's next?</h3>
                        <ul style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                          <li>Request a quote for your custom apparel</li>
                          <li>Browse our print methods (DTG, Embroidery, Screen Print)</li>
                          <li>Track your orders in real-time</li>
                          <li>Access exclusive pricing for bulk orders</li>
                        </ul>
                      </div>
                      
                      <div style="text-align: center; margin: 40px 0;">
                        <a href="https://kazimanufacturing.com/quote" 
                           style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                          Get a Quote
                        </a>
                      </div>
                      
                      <p style="color: #6a6a6a; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                        Have questions? Simply reply to this email — our team is here to help.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e5e5;">
                      <p style="color: #9a9a9a; font-size: 13px; margin: 0 0 10px 0;">
                        Kazi Manufacturing | Kathmandu, Nepal
                      </p>
                      <p style="color: #9a9a9a; font-size: 12px; margin: 0;">
                        <a href="https://kazimanufacturing.com" style="color: #dc2626; text-decoration: none;">kazimanufacturing.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
