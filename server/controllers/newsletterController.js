import Newsletter from '../models/Newsletter.js'
import { sendEmail } from '../services/emailService.js'

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body

    let subscriber = await Newsletter.findOne({ email })
    if (!subscriber) {
      subscriber = await Newsletter.create({ email })
    } else {
      subscriber.status = 'subscribed'
      await subscriber.save()
    }

    // Send confirmation
    await sendEmail({
      to: email,
      subject: 'Welcome to Wolf Alpha Newsletter',
      html: '<h2>Thank you for subscribing!</h2><p>You will receive updates about our latest projects and insights.</p>',
    })

    res.status(201).json({ success: true, message: 'Subscribed successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body

    await Newsletter.updateOne(
      { email },
      { status: 'unsubscribed', unsubscribedAt: new Date() }
    )

    res.json({ success: true, message: 'Unsubscribed successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
