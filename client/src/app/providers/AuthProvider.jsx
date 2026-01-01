import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store'
import { ROLES } from '../../shared/roles'

export function AuthProvider({ children }) {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const setUser = useAuthStore((state) => state.setUser)

  // Hydrate user from storage on refresh
  useEffect(() => {
    if (!user) {
      try {
        const raw = localStorage.getItem('user')
        if (raw) {
          setUser(JSON.parse(raw))
        }
      } catch (err) {
        localStorage.removeItem('user')
      }
    }
  }, [user, setUser])

  // Enforce client-side expiry awareness to mirror backend guard
  useEffect(() => {
    if (!user) return

    const expiry = user.accessExpiresAt ? new Date(user.accessExpiresAt) : null
    const now = new Date()
    const internMissingExpiry = user.role === ROLES.INTERN && !expiry

    if ((expiry && expiry < now) || internMissingExpiry) {
      logout()
      toast.error('Your access has expired. Please contact an administrator.')
    }
  }, [user, logout])

  return <>{children}</>
}
