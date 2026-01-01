import mongoose from 'mongoose'
import { ROLE_LIST, ROLES } from '../shared/constants/roles.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    role: { type: String, enum: ROLE_LIST, default: ROLES.CLIENT },
    permissions: { type: [String], default: [] }, // optional overrides/extensions beyond role
    accessExpiresAt: { type: Date, default: null },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
)

userSchema.methods.isAccessExpired = function () {
  return !!(this.accessExpiresAt && this.accessExpiresAt < new Date())
}

userSchema.index({ accessExpiresAt: 1 })

export default mongoose.model('User', userSchema)
