import mongoose from 'mongoose'

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    status: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'subscribed' },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.model('Newsletter', newsletterSchema)
