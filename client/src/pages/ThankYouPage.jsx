import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function ThankYouPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-6 flex justify-center"
        >
          <CheckCircle size={64} className="text-accent" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4 gradient-text">Thank You!</h1>
        <p className="text-gray-400 mb-2">Your message has been received successfully.</p>
        <p className="text-gray-400 mb-8">We'll get back to you within 24 hours.</p>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">Check your email for a confirmation message.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-accent hover:bg-orange-600 rounded-lg font-semibold transition"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}
