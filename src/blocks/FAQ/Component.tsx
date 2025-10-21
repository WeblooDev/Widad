'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FAQ as FAQType } from '@/payload-types'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'
import { cn } from '@/utilities/ui'

interface FAQProps extends FAQType {
  locale?: string
}

export const FAQ: React.FC<FAQProps & { locale: TypedLocale }> = ({
  title,
  description,
  questions,
  locale,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <div className="py-4 lg:py-16 bg-white">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {getLocalizedField(title, locale) || 'Latest From Wydad AC'}
          </h2>
          {description && (
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {getLocalizedField(description, locale) || ''}
            </p>
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
                  <h3
                    className={cn('text-lg font-semibold text-gray-900 ', {
                      'text-white': isOpen,
                    })}
                  >
                    {getLocalizedField(item.question, locale) || ''}
                  </h3>
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
                    <p
                      className={cn('text-gray-600 leading-relaxed', {
                        'text-white': isOpen,
                      })}
                    >
                      {getLocalizedField(item.answer, locale) || ''}
                    </p>
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
