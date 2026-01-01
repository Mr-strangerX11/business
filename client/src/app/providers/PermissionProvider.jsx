import React, { createContext, useContext, useMemo } from 'react'
import { useAuthStore } from '../../store'
import { ROLE_PERMISSIONS } from '../../shared/rolePermissions'

const PermissionContext = createContext({ permissions: [], hasPermission: () => false })

export const PermissionProvider = ({ children }) => {
  const user = useAuthStore((state) => state.user)

  const permissions = useMemo(() => {
    if (!user) return []
    const base = ROLE_PERMISSIONS[user.role] || []
    const custom = user.permissions || []
    return Array.from(new Set([...base, ...custom]))
  }, [user])

  const hasPermission = (permission) => permissions.includes(permission)

  return (
    <PermissionContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </PermissionContext.Provider>
  )
}

export const usePermission = () => useContext(PermissionContext)
