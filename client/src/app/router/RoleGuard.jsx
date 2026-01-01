import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store'

export const RoleGuard = ({ allowed, redirectTo = '/', children }) => {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowed.includes(user.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}
