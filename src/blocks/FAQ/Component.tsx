'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FAQ as FAQType } from '@/payload-types'

interface FAQProps extends FAQType {
  locale?: string
}

export const FAQ: React.FC<FAQProps> = ({ title, description, questions }) => {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <div className="py-16 bg-white">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title || 'Latest From Wydad AC'}</h2>
          {description && (
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">{description}</p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={`rounded-[20px] overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-r from-[#E63946] to-[#A4161A] text-white'
                    : 'bg-white border border-gray-200 text-black'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:opacity-90 transition-opacity"
                >
                  <span className="text-lg font-medium pr-4">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 flex-shrink-0" />
                  )}
                </button>

                {/* Answer - Animated */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-white/90 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
