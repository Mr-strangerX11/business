import mongoose from 'mongoose'

const workingHoursSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    hoursWorked: { type: Number, min: 0, max: 24, default: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
)

workingHoursSchema.index({ user: 1, date: 1 }, { unique: true })

export default mongoose.model('WorkingHours', workingHoursSchema)
