import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold gradient-text">Wolf</span>
              <span className="text-xl font-bold text-accent">Alpha</span>
            </Link>
            <p className="text-gray-400 text-sm">Building the future, one project at a time.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#services" className="hover:text-accent transition">Development</a></li>
              <li><a href="/#services" className="hover:text-accent transition">API Design</a></li>
              <li><a href="/#services" className="hover:text-accent transition">Cloud Services</a></li>
              <li><a href="/#services" className="hover:text-accent transition">AI Integration</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#about" className="hover:text-accent transition">About Us</a></li>
              <li><Link to="/knowledge-base" className="hover:text-accent transition">Knowledge Base</Link></li>
              <li><a href="#" className="hover:text-accent transition">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-accent transition">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} Wolf Alpha. All rights reserved. | Made with ❤️ by our team</p>
        </div>
      </div>
    </footer>
  )
}
