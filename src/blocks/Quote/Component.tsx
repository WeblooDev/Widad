'use client'

import type { Quote as QuoteType, Media as MediaType } from '@/payload-types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

export const Quote: React.FC<QuoteType & { locale: TypedLocale }> = ({ image, overlayImage, quote, author, locale }) => {
  const localizedQuote = getLocalizedField(quote, locale)
  const localizedAuthor = getLocalizedField(author, locale)
  const quoteImage = image as MediaType
  const overlayImg = overlayImage as MediaType
  const [isInView, setIsInView] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    if (!isInView || !localizedQuote) return

    let currentIndex = 0
    const typingSpeed = 30 // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex < localizedQuote.length) {
        setDisplayedText(localizedQuote.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, typingSpeed)
      } else {
        setIsTypingComplete(true)
      }
    }

    typeNextChar()

    return () => {
      setDisplayedText('')
      setIsTypingComplete(false)
    }
  }, [isInView, localizedQuote])

  return (
    <div className="py-0 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4 lg:gap-16 items-end">
          {/* Quote Section */}
          <div className="relative">
            {/* Large Red Quote Symbol */}
            <motion.div
              className="text-primary-red text-[120px] leading-none font-serif mb-16"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image src="/icons/quote.svg" alt="quote" width={80} height={66} />
            </motion.div>

            {/* Quote Text with Typewriter Effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              onViewportEnter={() => setIsInView(true)}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="text-5xl lg:text-7xl font-normal text-black">
                {displayedText}
                {/* Blinking Cursor - follows typing */}
                <motion.span
                  className="inline-block w-1 h-[0.8em] bg-primary-red ml-1 align-middle"
                  animate={{
                    opacity: isTypingComplete ? [1, 1, 0, 0] : 1,
                  }}
                  transition={{
                    duration: isTypingComplete ? 1 : 0,
                    repeat: isTypingComplete ? Infinity : 0,
                    ease: 'linear',
                  }}
                />
              </blockquote>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            className="relative aspect-[1.5/1] lg:aspect-[1/1.1] rounded-[20px] overflow-visible"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {quoteImage?.url && (
              <Image
                src={quoteImage.url}
                alt={localizedAuthor || 'Quote'}
                fill
                className="object-cover rounded-[20px]"
              />
            )}

            {/* Right Side - Overlay Image */}
            {overlayImg?.url && (
              <motion.div
                className="absolute bottom-0 -left-[30%] w-[125%] h-[125%]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Image src={overlayImg.url} alt="" fill className="object-contain object-bottom" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
