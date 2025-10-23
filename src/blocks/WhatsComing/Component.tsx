'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { WhatsComingBlock as WhatsComingBlockType } from '@/payload-types'
import { WhatsComingCard } from '@/components/WhatsComingCard'
import { useLocale, useTranslations } from 'next-intl'

type Props = WhatsComingBlockType

export const WhatsComingBlock: React.FC<Props> = (props) => {
  const { heading, subheading, items } = props
  const interactiveRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const t = useTranslations()

  useEffect(() => {
    const interBubble = interactiveRef.current
    if (!interBubble) return

    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      requestAnimationFrame(move)
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="relative bg-white py-12" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Sticky Header */}
      <div className="relative top-0 z-10 py-8 px-6 md:px-12 max-w-[1400px] mx-auto">
        {subheading && (
          <motion.p
            className={`text-sm font-medium tracking-wider uppercase text-gray-600 mb-2 ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {subheading}
          </motion.p>
        )}
        {heading && (
          <motion.h2
            className={`text-5xl md:text-7xl font-bold text-black ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {heading}
          </motion.h2>
        )}
      </div>

      {/* Stacking Cards */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto mt-8">
        {items.map((item, index) => {
          if (!item || typeof item === 'string') return null

          const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : ''

          let background = ''
          let isBackgroundImage = false

          if (item.backgroundType === 'image' && item.backgroundImage) {
            background =
              typeof item.backgroundImage === 'object' && item.backgroundImage?.url
                ? item.backgroundImage.url
                : ''
            isBackgroundImage = true
          } else if (item.backgroundType === 'color' && item.backgroundColor) {
            background = item.backgroundColor
            isBackgroundImage = false
          }

          return (
            <motion.div
              key={index}
              className="sticky mb-6"
              style={{
                top: `${120 + index * 24}px`, // Start closer to header (120px) and stack with 24px offset
                zIndex: items.length + index, // First card has highest z-index, decreasing for proper stacking
              }}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <WhatsComingCard
                tag={item.tag || ''}
                title={item.title || ''}
                description={item.description || ''}
                image={imageUrl}
                background={background}
                isBackgroundImage={isBackgroundImage}
                scale={1 + index * 0.02}
                isLastCard={index === items.length - 1}
                trophies={item.trophies || []}
              />
            </motion.div>
          )
        })}

        {/* Spacer to allow last card to stick */}
        {/* <div className="h-[600px]" /> */}
      </div>

      {/* Stay Tuned Section */}
      <motion.div
        className="mt-24 text-center py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className={`text-lg font-medium tracking-wider uppercase text-gray-600 mb-4 ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('whatsComing.subtitle')}
        </motion.p>
        <motion.h2
          className={`text-5xl md:text-8xl font-bold text-black leading-5xl md:leading-8xl gap-2 uppercase mx-auto ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('whatsComing.title.part1')}{' '}
          <motion.span
            className="text-red-600"
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('whatsComing.title.highlight')}
          </motion.span>{' '}
          {t('whatsComing.title.part2')}
        </motion.h2>
      </motion.div>
    </div>
  )
}
