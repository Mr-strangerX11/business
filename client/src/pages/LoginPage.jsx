import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'
import { useAuthStore, useThemeStore } from '../store'
import wLogo from '../logo/w-logo.png'
import bLogo from '../logo/B-logo.png'
import logo1Bg from '../logo/logo1.png'
import logo2Bg from '../logo/logo2.png'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { isDark } = useThemeStore()
  const logoSrc = isDark ? wLogo : bLogo
  const formBg = isDark ? logo1Bg : logo2Bg

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await authAPI.login({ identifier, password })
      login(response.data.user, response.data.token)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div 
          className="glass-dark p-8 rounded-lg relative overflow-hidden"
          style={{
            backgroundImage: `url(${formBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: isDark ? 'rgba(17,24,39,0.8)' : 'rgba(255,255,255,0.82)' }}
          ></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <img src={logoSrc} alt="Wolf Alpha" className="h-16 w-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center gradient-text">Welcome Back</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Email or Username</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-white/80 text-primary-900 border border-primary-200 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:border-white/10"
                placeholder="you@email.com or username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/80 text-primary-900 border border-primary-200 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:border-white/10"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-orange-600 text-white font-semibold py-2 rounded transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-orange-600 transition">
              Sign up
            </Link>
          </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
