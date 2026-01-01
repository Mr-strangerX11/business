import Contact from '../models/Contact.js'
import { sendEmail } from '../services/emailService.js'

export const submitContact = async (req, res) => {
  try {
    const { name, email, message, phone, company } = req.body

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      message,
      phone: phone || '',
      company: company || '',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    })

    // Send confirmation email to user
    const userEmailResult = await sendEmail({
      to: email,
      subject: 'We received your message - Wolf Alpha',
      html: `
        <h2>Thank you for contacting Wolf Alpha!</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Best regards,<br>Wolf Alpha Team</p>
      `,
    })

    // Send notification email to internal inbox
    const notifyEmailResult = await sendEmail({
      to: 'wolf.alpha.k77@gmail.com',
      subject: `New contact message from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><em>IP:</em> ${req.ip || 'unknown'}</p>
        <p><em>User-Agent:</em> ${req.get('user-agent') || 'unknown'}</p>
      `,
    })

    if (!userEmailResult.success) {
      console.warn('Failed to send confirmation email to user:', userEmailResult.error || userEmailResult.reason)
    }
    if (!notifyEmailResult.success) {
      console.warn('Failed to send notification email:', notifyEmailResult.error || notifyEmailResult.reason)
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting Wolf Alpha! We will get back to you soon.',
      data: { id: contact._id },
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process contact form',
    })
  }
}

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: contacts })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' })
  }
}

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params
    const { status, response } = req.body

    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        status,
        response,
        respondedBy: req.user.id,
        respondedAt: new Date(),
      },
      { new: true }
    )

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' })
    }

    // Send response email to user
    if (response) {
      await sendEmail({
        to: contact.email,
        subject: 'Response from Wolf Alpha',
        html: `<h2>Hello ${contact.name}</h2><p>${response}</p><p>Best regards,<br>Wolf Alpha Team</p>`,
      })
    }

    res.status(200).json({ success: true, data: contact })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contact' })
  }
}

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params
    await Contact.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Contact deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete contact' })
  }
}
