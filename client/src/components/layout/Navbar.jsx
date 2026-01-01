import React, { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeStore, useAuthStore } from '../../store'
import { motion } from 'framer-motion'
import wLogo from '../../logo/w-logo.png'
import bLogo from '../../logo/B-logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark, toggleTheme } = useThemeStore()
  const { isAuthenticated, logout, user } = useAuthStore()
  const logoSrc = isDark ? wLogo : bLogo

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-[var(--bg-card)]/85 shadow-lg border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoSrc} alt="Wolf Alpha" className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {[{href:'/#services',label:'Services'},{href:'/#about',label:'About'},{href:'/#process',label:'Process'},{href:'/#contact',label:'Contact'}].map((item)=> (
              <a key={item.href} href={item.href} className="nav-underline px-2 py-1 hover:text-accent-primary transition">
                {item.label}
              </a>
            ))}

            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted">{user?.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg cta-primary hover:-translate-y-0.5 hover:shadow-xl transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg cta-primary hover:-translate-y-0.5 hover:shadow-xl transition"
                >
                  Login
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 nav-underline hover:text-accent-primary transition"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            <a href="/#services" className="block px-4 py-2 nav-underline hover:text-accent-primary">Services</a>
            <a href="/#about" className="block px-4 py-2 nav-underline hover:text-accent-primary">About</a>
            <a href="/#process" className="block px-4 py-2 nav-underline hover:text-accent-primary">Process</a>
            <a href="/#contact" className="block px-4 py-2 nav-underline hover:text-accent-primary">Contact</a>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full mt-2 px-4 py-2 bg-accent text-white rounded hover:bg-orange-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block w-full px-4 py-2 bg-accent text-white rounded text-center">
                  Login
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
