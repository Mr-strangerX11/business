import React from 'react'
import { Navigate } from 'react-router-dom'
import { usePermission } from '../providers/PermissionProvider'

export const PermissionGuard = ({ permission, redirectTo = '/', children }) => {
  const { hasPermission } = usePermission()

  if (!hasPermission(permission)) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}
