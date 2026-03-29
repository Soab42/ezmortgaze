import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/settings/email/verify?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_FROM || '"EZMortgage" <noreply@ezmortgagelender.com>',
    to: email,
    subject: 'Verify your new email address',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #f59e0b;">Email Verification</h2>
        <p>You requested to change your email address on EZMortgage Admin.</p>
        <p>Please click the button below to verify your new email address. This link will expire in 1 hour.</p>
        <div style="margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
        </div>
        <p style="color: #666; font-size: 14px;">If you did not request this change, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">Link: ${resetLink}</p>
      </div>
    `,
  }

  // For development, if SMTP is not configured, log the link
  if (!process.env.SMTP_USER || process.env.SMTP_USER.includes('your-email')) {
    console.log('--- DEVELOPMENT MODE: EMAIL VERIFICATION LINK ---')
    console.log(`To: ${email}`)
    console.log(`Link: ${resetLink}`)
    console.log('-------------------------------------------------')
    return { success: true, message: 'Log to console' }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw new Error('Failed to send verification email')
  }
}
