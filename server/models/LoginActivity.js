import mongoose from 'mongoose'

const loginActivitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: String, required: true },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
)

loginActivitySchema.index({ user: 1, createdAt: -1 })

export default mongoose.model('LoginActivity', loginActivitySchema)
