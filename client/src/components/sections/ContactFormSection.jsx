import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { contactAPI, newsletterAPI } from '../../services/api'
import ScrollReveal from '../common/ScrollReveal'
import { useNavigate } from 'react-router-dom'

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await contactAPI.submit(formData)
      await newsletterAPI.subscribe(formData.email)
      toast.success('Message sent! Check your email.')
      setTimeout(() => navigate('/thank-you'), 1500)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-primary-800/50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">Let's Build Something Great</h2>
          <p className="text-gray-400 text-center text-lg mb-16">
            Ready to transform your idea into reality? Get in touch with us today.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-400">wolf.alpha.k77@gmail.com</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-400">+977 9705478032</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-gray-400">Remote-First • Global</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Response Time</h3>
                <p className="text-gray-400">Within 24 hours</p>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-sm text-accent">Follow Us</p>
                <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                    GitHub
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                    LinkedIn
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition"
                    placeholder="+977 9000000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 rounded transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
