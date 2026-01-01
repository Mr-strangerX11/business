import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store'

export const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    if (!user) return
    if (user.accessExpiresAt) {
      const expiry = new Date(user.accessExpiresAt)
      if (expiry < new Date()) {
        logout()
        toast.error('Session expired. Please log in again.')
        setAllowed(false)
      }
    }
  }, [user, logout])

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowed) {
    return <Navigate to="/login" replace />
  }

  return children
}
