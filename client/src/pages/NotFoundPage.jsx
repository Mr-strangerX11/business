import React from 'react'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-accent hover:bg-orange-600 rounded-lg font-semibold transition"
        >
          Go Home
        </a>
      </motion.div>
    </div>
  )
}
