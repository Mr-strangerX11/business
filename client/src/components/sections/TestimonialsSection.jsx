import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechStartup Co.',
    message: 'Wolf Alpha transformed our vision into reality. Their expertise and dedication is unmatched.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, Innovation Labs',
    message: 'The team delivered a production-ready platform in half the expected timeline. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'CTO, Global Enterprises',
    message: 'Best development partner we\'ve worked with. Their attention to detail is exceptional.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-24 px-4 bg-primary-800/50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">Client Testimonials</h2>
          <p className="text-gray-400 text-center text-lg mb-16">
            Hear from leaders who've transformed their businesses with Wolf Alpha.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Carousel */}
          <div className="glass-dark p-8 md:p-12 rounded-lg min-h-64 flex flex-col justify-between">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonials[current].rating ? 'text-accent' : 'text-gray-600'}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-lg italic text-gray-300">"{testimonials[current].message}"</p>
            </motion.div>

            <motion.div
              key={`name-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <p className="font-bold text-lg">{testimonials[current].name}</p>
              <p className="text-accent">{testimonials[current].role}</p>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prev}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition ${
                    i === current ? 'bg-accent' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
