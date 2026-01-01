import React from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../common/ScrollReveal'
import { CheckCircle } from 'lucide-react'

const steps = [
  {
    title: 'Discovery',
    description: 'We understand your goals, target audience, and technical requirements.',
    details: ['Requirement gathering', 'Market research', 'Feasibility analysis']
  },
  {
    title: 'Design',
    description: 'Creative design and technical architecture planning.',
    details: ['UI/UX design', 'System architecture', 'Prototyping']
  },
  {
    title: 'Development',
    description: 'Agile development with regular updates and demos.',
    details: ['Iterative development', 'Code reviews', 'Testing']
  },
  {
    title: 'Deployment',
    description: 'Seamless launch to production with monitoring.',
    details: ['Infrastructure setup', 'Performance optimization', 'Go-live']
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">Our Process</h2>
          <p className="text-gray-400 text-center text-lg max-w-2xl mx-auto mb-16">
            A proven methodology that delivers results, every single time.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div className="glass-dark p-8 rounded-lg h-full">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-accent font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle size={16} className="text-accent flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
