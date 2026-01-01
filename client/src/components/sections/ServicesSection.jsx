import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Zap, Cloud, Brain, Lock, Smartphone } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications built with cutting-edge technologies and best practices.',
  },
  {
    icon: Zap,
    title: 'API Development',
    description: 'Scalable, secure REST APIs and microservices for enterprise solutions.',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'AWS, Azure, and Google Cloud infrastructure setup and optimization.',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Machine learning models and AI-powered features integrated into your platform.',
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security, encryption, and compliance implementations.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Mobile-first design that works flawlessly across all devices.',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">Our Services</h2>
          <p className="text-muted text-center text-lg max-w-2xl mx-auto mb-16">
            Comprehensive solutions to accelerate your digital transformation and market presence.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="card-base p-8 rounded-xl group hover:border-accent-primary/60 hover:shadow-xl hover-lift"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition" style={{ backgroundColor: 'var(--accent-soft)' }} aria-hidden>
                    <Icon size={28} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--text-main)]">{service.title}</h3>
                  <p className="text-muted">{service.description}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
