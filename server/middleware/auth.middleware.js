import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'] || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' })
    }

    if (user.isActive === false) {
      return res.status(403).json({ success: false, message: 'Account disabled' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' })
  }
}
