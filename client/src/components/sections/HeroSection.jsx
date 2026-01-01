import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const [text, setText] = useState('')
  const fullText = 'Building Tomorrow\'s Solutions Today'
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(text + fullText[index])
        setIndex(index + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [index, text, fullText])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-16">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{ backgroundColor: 'var(--accent-secondary)' }} />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" style={{ backgroundColor: 'var(--accent-primary)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff1a,transparent_45%)] dark:bg-[radial-gradient(circle_at_top,#ffffff0d,transparent_45%)]" />
      </div>

      <div className="absolute inset-0 -z-5" aria-hidden>
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.12)' }}></div>
      </div>

      <div className="max-w-4xl text-center z-10 panel-base rounded-2xl px-6 py-12 md:px-12" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight mx-auto max-w-3xl"
        >
          <span className="gradient-text">{text}</span>
          <span className="animate-pulse">|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted mb-8 max-w-2xl mx-auto"
        >
          Premium full-stack development services for startups, enterprises, and visionary leaders worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="/#contact"
            className="px-8 py-4 rounded-lg font-semibold cta-primary hover:-translate-y-1 hover:shadow-xl hover:brightness-105 transition"
          >
            Get Started
          </a>
          <a
            href="/#about"
            className="px-8 py-4 rounded-lg font-semibold cta-secondary hover:-translate-y-1 hover:shadow-lg transition"
          >
            Learn More
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>50+</span>
            <span>Projects Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>30+</span>
            <span>Happy Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>5+</span>
            <span>Years Experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
