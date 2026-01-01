import React from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../common/ScrollReveal'

export default function AboutSection() {
  const stats = [
    { label: 'Years Active', value: '5+' },
    { label: 'Team Members', value: '15+' },
    { label: 'Projects', value: '50+' },
    { label: 'Satisfaction', value: '100%' },
  ]

  const pillars = [
    { title: 'Our Mission', copy: 'Empower businesses with cutting-edge technology that drives growth, efficiency, and innovation.' },
    { title: 'Our Vision', copy: 'Be the most trusted full-stack partner, transforming ideas into successful digital products.' },
    { title: 'Our Values', copy: 'Excellence, integrity, innovation, and client success guide everything we do.' },
  ]

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <ScrollReveal>
          <div className="panel-base rounded-2xl p-8 md:p-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Wolf Alpha</h2>
            <p className="text-muted text-lg max-w-3xl">
              At Wolf Alpha, we're more than developers—we're strategic partners in your digital transformation journey.
            </p>
            <p className="text-muted max-w-3xl">
              We specialize in building scalable, high-performance software that helps businesses thrive in the digital age.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {stats.map((stat, i) => (
                <div key={i} className="card-base p-4 rounded-xl text-center hover-lift">
                  <div className="text-accent-primary font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-4">
            {pillars.map((item, i) => (
              <div key={i} className="card-base p-6 rounded-xl border border-[var(--border)]/80 hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <p className="text-muted text-sm leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
