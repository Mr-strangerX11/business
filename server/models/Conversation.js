import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema(
  {
    visitorName: { type: String, trim: true },
    visitorEmail: { type: String, lowercase: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'closed', 'pending'], default: 'active' },
    hasResponse: { type: Boolean, default: false },
    lastMessageAt: { type: Date, default: Date.now },
    closedAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.model('Conversation', conversationSchema)
