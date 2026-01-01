import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/common/ScrollReveal'
import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import ContactFormSection from '../components/sections/ContactFormSection'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  return (
    <div className="w-full pt-16">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <Footer />
    </div>
  )
}
