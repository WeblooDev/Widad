'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const StripeReveal: React.FC = () => {
  const stripeCount = 15
  const stripes = Array.from({ length: stripeCount }, (_, i) => i)

  return (
    <div className="fixed inset-0 z-[52] pointer-events-none flex flex-col">
      {stripes.map((index) => (
        <div key={index} className="flex-1 flex" style={{ height: `${100 / stripeCount}%` }}>
          {/* Left half - slides left */}
          <motion.div
            className="w-1/2 bg-white"
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 0.6,
              delay: index * 0.05, // Stagger from top to bottom
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          {/* Right half - slides right */}
          <motion.div
            className="w-1/2 bg-white"
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.6,
              delay: index * 0.05, // Stagger from top to bottom
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      ))}
    </div>
  )
}
