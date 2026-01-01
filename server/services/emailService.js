import nodemailer from 'nodemailer'

console.log('📧 Email config loaded:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  passLength: process.env.SMTP_PASS?.length,
  from: process.env.SMTP_FROM,
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const logOnly = process.env.EMAIL_LOG_ONLY === 'true'
    const missingConfig = !(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

    // Log-only mode or missing config: do not throw, just report
    if (logOnly || missingConfig) {
      console.log(`\n📧 Email log-only mode${missingConfig ? ' (missing SMTP config)' : ''}`)
      console.log(`To: ${to}`)
      console.log(`Subject: ${subject}\n`)
      return { success: false, skipped: true, reason: missingConfig ? 'missing SMTP config' : 'EMAIL_LOG_ONLY' }
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    })

    console.log('✅ Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email send failed:', error.message)
    console.error('Full error:', error)
    // Don't throw - return failure so contact submission doesn't fail
    return { success: false, error: error.message }
  }
}
