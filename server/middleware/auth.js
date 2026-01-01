import { requireAuth } from './auth.middleware.js'
import { requireRole } from './role.middleware.js'
import { requirePermission } from './permission.middleware.js'
import { checkAccessExpiry } from './accessExpiry.middleware.js'

// Legacy exports kept for backward compatibility with existing routes
export const authenticateToken = requireAuth
export const authorizeRole = (...roles) => requireRole(...roles)

// Preferred exports
export { requireAuth, requireRole, requirePermission, checkAccessExpiry }
