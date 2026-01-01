import { ROLE_PERMISSIONS } from '../shared/constants/rolePermissions.js'
import { PERMISSIONS } from '../shared/constants/permissions.js'

const buildPermissionSet = (user) => {
  const base = ROLE_PERMISSIONS[user.role] || []
  const custom = user.permissions || []
  return new Set([...base, ...custom])
}

export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' })
    }

    const permissions = buildPermissionSet(req.user)
    const isAllowed =
      permissions.has(permission) ||
      (permission === PERMISSIONS.RESPOND_CHATS && permissions.has(PERMISSIONS.MANAGE_CHATS))

    if (!isAllowed) {
      return res.status(403).json({ success: false, message: 'Permission denied' })
    }

    next()
  }
}

export const resolveUserPermissions = (user) => Array.from(buildPermissionSet(user))
