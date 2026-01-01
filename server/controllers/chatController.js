import Message from '../models/Message.js'
import Conversation from '../models/Conversation.js'
import { generateAIResponse } from '../services/aiService.js'
import { sendEmail } from '../services/emailService.js'
import User from '../models/User.js'
import { ROLES } from '../shared/constants/roles.js'

export const sendMessage = async (req, res) => {
  try {
    const { text, conversationId, visitorName, visitorEmail } = req.body

    // Find or create conversation
    let conversation = conversationId 
      ? await Conversation.findById(conversationId)
      : await Conversation.create({ visitorName, visitorEmail })

    // Create message
    const message = await Message.create({
      text,
      sender: 'user',
      senderName: visitorName,
      senderEmail: visitorEmail,
      conversationId: conversation._id,
    })

    // Generate AI response
    const aiResponse = await generateAIResponse(text)

    // Create AI message
    const aiMessage = await Message.create({
      text: aiResponse,
      sender: 'ai',
      conversationId: conversation._id,
    })

    // Update conversation
    conversation.messages.push(message._id, aiMessage._id)
    conversation.lastMessageAt = new Date()
    await conversation.save()

    // Notify admin
    const admins = await User.find({ role: { $in: [ROLES.ADMIN, ROLES.STAFF] } })
    for (const admin of admins) {
      await sendEmail({
        to: admin.email,
        subject: `New Chat Message from ${visitorName || 'Anonymous'}`,
        html: `
          <h2>New Chat Message</h2>
          <p><strong>From:</strong> ${visitorName || 'Anonymous'} (${visitorEmail})</p>
          <p><strong>Message:</strong> ${text}</p>
        `,
      })
    }

    res.status(201).json({ success: true, message, aiMessage, conversation })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id).populate('messages')
    res.json({ success: true, conversation })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort('-lastMessageAt').populate('messages', 'text sender')
    res.json({ success: true, conversations })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const respondToMessage = async (req, res) => {
  try {
    const { messageId } = req.params
    const { text } = req.body

    const message = await Message.findById(messageId)
    const conversation = await Conversation.findById(message.conversationId)

    // Create admin response
    const response = await Message.create({
      text,
      sender: 'admin',
      conversationId: conversation._id,
      respondedBy: req.user.id,
    })

    // Update original message
    message.response = text
    message.respondedBy = req.user.id
    message.respondedAt = new Date()
    await message.save()

    // Update conversation
    conversation.messages.push(response._id)
    conversation.hasResponse = true
    await conversation.save()

    // Send email to visitor
    if (message.senderEmail) {
      await sendEmail({
        to: message.senderEmail,
        subject: 'Response from Wolf Alpha',
        html: `<h2>We've responded to your message</h2><p>${text}</p>`,
      })
    }

    res.json({ success: true, response })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
