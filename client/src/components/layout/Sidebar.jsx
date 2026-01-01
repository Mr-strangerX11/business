import React from 'react'
import { useAuthStore } from '../../store'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return (
    <aside className="hidden lg:block w-64 bg-primary-800 border-r border-white/10 min-h-screen pt-20">
      <nav className="p-4 space-y-2">
        <Link to="/admin" className="block px-4 py-2 rounded hover:bg-white/10">
          Dashboard
        </Link>
        <Link to="/admin/messages" className="block px-4 py-2 rounded hover:bg-white/10">
          Messages
        </Link>
        <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-white/10">
          Users
        </Link>
        <Link to="/admin/settings" className="block px-4 py-2 rounded hover:bg-white/10">
          Settings
        </Link>
      </nav>
    </aside>
  )
}
