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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { isDark } = useThemeStore()
  const logoSrc = isDark ? wLogo : bLogo
  const formBg = isDark ? logo1Bg : logo2Bg

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      login(response.data.user, response.data.token)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
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
            <h1 className="text-3xl font-bold mb-6 text-center gradient-text">Create Account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/80 text-primary-900 border border-primary-200 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:border-white/10"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white/80 text-primary-900 border border-primary-200 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:border-white/10"
                  placeholder="username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/80 text-primary-900 border border-primary-200 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:border-white/10"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/80 text-primary-900 border border-primary-200 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-white/5 dark:text-white dark:border-white/10"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-primary-900 dark:text-white">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:text-orange-600 transition">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
