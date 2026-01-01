import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'

const faqItems = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Most projects range from 8-16 weeks depending on complexity. We provide detailed timelines during the planning phase.',
  },
  {
    question: 'Do you offer post-launch support?',
    answer: 'Yes, we provide comprehensive maintenance, updates, and support packages for all deployed projects.',
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We specialize in React, Node.js, MongoDB, PostgreSQL, AWS, and modern cloud technologies. We adapt our stack to your needs.',
  },
  {
    question: 'How do you ensure quality?',
    answer: 'We employ rigorous testing, code reviews, security audits, and follow industry best practices throughout development.',
  },
  {
    question: 'Can you integrate with existing systems?',
    answer: 'Absolutely. We specialize in API integrations, legacy system modernization, and third-party platform connections.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-center">Frequently Asked Questions</h2>
          <p className="text-muted text-center text-lg mb-16">
            Find answers to your most common questions about our services and process.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <motion.div
                initial={false}
                animate={{ backgroundColor: openIndex === index ? 'var(--bg-card)' : 'var(--bg-card)' }}
                className="card-base rounded-xl overflow-hidden border border-[var(--border)]/80"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex justify-between items-center hover:bg-white/5 dark:hover:bg-white/5 hover:bg-[var(--accent-soft)]/40 transition"
                >
                  <h3 className="text-lg font-semibold text-left text-[var(--text-main)]">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className="text-accent-primary" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted">{item.answer}</p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
