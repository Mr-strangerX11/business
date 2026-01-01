import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' },
    response: { type: String },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    respondedAt: { type: Date },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)
