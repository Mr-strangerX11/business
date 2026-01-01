import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    sender: { type: String, enum: ['user', 'admin', 'ai'], required: true },
    senderName: { type: String },
    senderEmail: { type: String },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    response: { type: String },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    respondedAt: { type: Date },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)
