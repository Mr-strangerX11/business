import LoginActivity from '../models/LoginActivity.js'
import { ROLES } from '../shared/constants/roles.js'

export const checkAccessExpiry = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  const { role, accessExpiresAt } = req.user
  const now = new Date()
  const hasExpiry = !!accessExpiresAt
  const isExpired = req.user.isAccessExpired()
  const internMissingExpiry = role === ROLES.INTERN && !accessExpiresAt

  if (internMissingExpiry || (hasExpiry && isExpired)) {
    try {
      await LoginActivity.create({
        user: req.user._id,
        event: 'access_expired',
        ip: req.ip,
        userAgent: req.get('user-agent') || 'unknown',
      })
    } catch (err) {
      // Non-blocking: logging failure should not hide expiry enforcement
      console.warn('access expiry log failed', err?.message)
    }

    return res.status(403).json({
      success: false,
      message: 'Access expired. Please contact an administrator.',
    })
  }

  // Staff can be time-limited; interns must be time-limited; others skip
  next()
}
