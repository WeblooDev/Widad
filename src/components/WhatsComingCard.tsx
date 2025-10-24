'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import './WhatsComingCard.css'
import { useLocale } from 'next-intl'
import { cn } from '@/utilities/ui'

interface Trophy {
  name: string | Record<string, string>
  count: number
  logo: string | Media
}

interface WhatsComingCardProps {
  tag: string
  title: string
  description: string
  image: string
  background: string // Can be color (e.g., '#DC2626') or image URL
  isBackgroundImage?: boolean
  scale?: number
  isLastCard?: boolean
  trophies?: Trophy[]
}

export const WhatsComingCard: React.FC<WhatsComingCardProps> = ({
  tag,
  title,
  description,
  image,
  background,
  isBackgroundImage = false,
  scale = 1,
  isLastCard = false,
  trophies = [],
}) => {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  return (
    <div
      className="relative"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      <div className="relative">
        {/* Border layers */}
        <motion.div
          className="relative overflow-hidden rounded-3xl h-[400px] glass-border"
          style={{
            backgroundColor: isBackgroundImage ? 'transparent' : background,
            background: `radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), ${isBackgroundImage ? 'transparent' : background}`,
          }}
        >
          {/* Inner content wrapper */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {/* Background Image (if applicable) */}
            {isBackgroundImage && (
              <div className="absolute inset-0">
                <Image src={background} alt="" fill className="object-cover" />
              </div>
            )}

            {/* Gradient Overlay for better text readability */}
            <div
              className={cn('absolute inset-0 from-black/50 to-transparent z-[6]', {
                'bg-gradient-to-l': isArabic,
                'bg-gradient-to-r': !isArabic,
              })}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 z-10">
              {/* Logo/Icon */}
              <motion.div
                className="w-12 h-12 relative"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src="/wydad-logo.svg" alt="Wydad AC" fill className="object-contain" />
              </motion.div>

              {/* Trophy Hexagons - positioned after logo, before text on mobile */}
              {isLastCard && trophies.length > 0 && (
                <div className="flex md:hidden absolute top-[55px] left-[-20px] flex-row items-center justify-center gap-4 my-4 scale-[0.7]">
                  {trophies.map((trophy, idx) => {
                    return (
                      <motion.div
                        key={idx}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                      >
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg
                            width="176"
                            height="176"
                            viewBox="0 0 176 176"
                            className="absolute pointer-events-none w-full h-full"
                            style={{
                              filter: 'drop-shadow(0px 8.32px 21.64px #00000080)',
                            }}
                          >
                            <path
                              d="M 88 3.5 Q 98.5 3.5 105.6 10.6 L 154.9 42.2 Q 162 49.3 162 59.8 L 162 116.2 Q 162 126.7 154.9 133.8 L 105.6 165.4 Q 98.5 172.5 88 172.5 Q 77.5 172.5 70.4 165.4 L 21.1 133.8 Q 14 126.7 14 116.2 L 14 59.8 Q 14 49.3 21.1 42.2 L 70.4 10.6 Q 77.5 3.5 88 3.5 Z"
                              fill="rgba(231, 0, 11, 0.50)"
                              stroke="#FF83838C"
                              strokeWidth="1.07"
                            />
                          </svg>
                          <div className="absolute z-10 w-24 h-24 flex items-center justify-center p-4">
                            {trophy.logo && typeof trophy.logo !== 'string' && trophy.logo.url && (
                              <Image
                                src={trophy.logo.url}
                                alt={''}
                                width={100}
                                height={100}
                                className="object-contain max-w-full max-h-full"
                              />
                            )}
                          </div>
                          <div className="text-sm font-bold text-white bg-primary-red absolute bottom-1 right-4 w-8 h-8 flex items-center justify-center rounded-full z-20 shadow-lg">
                            {trophy.count < 10 ? '0' : ''}
                            {trophy.count}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* Text Content */}
              <div className="space-y-3 max-w-md">
                <motion.p
                  className={`text-white/90 text-sm font-medium tracking-wide uppercase ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {tag}
                </motion.p>
                <motion.h3
                  className={`text-white text-4xl md:text-5xl font-semibold capitalize leading-tight ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {title}
                </motion.h3>
                <motion.p
                  className={`text-white lg:text-white/80 text-base md:text-lg leading-relaxed ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>

            {/* Right Image - behind text on mobile, absolute on desktop */}
            {!isLastCard && image && (
              <motion.div
                className={`absolute ${isArabic ? 'left-0' : 'right-0'} bottom-0 w-full md:w-1/2 h-full z-0`}
                initial={{ x: isArabic ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </motion.div>
            )}

            {/* Trophy Hexagons - desktop only (absolute positioned) */}
            {isLastCard && trophies.length > 0 && (
              <div
                className="hidden md:flex absolute flex-row items-center justify-end gap-6"
                style={{
                  scale: '0.7',
                  right: isArabic ? 'unset' : '-18px',
                  left: isArabic ? '-18px' : 'unset',
                  top: '50px',
                }}
              >
                {trophies.map((trophy, idx) => {
                  const logoUrl =
                    typeof trophy.logo === 'string' ? trophy.logo : trophy.logo?.url || ''
                  const trophyName =
                    typeof trophy.name === 'string' ? trophy.name : trophy.name?.en || ''

                  return (
                    <motion.div
                      key={idx}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                    >
                      <div className="relative w-32 lg:w-48 h-32 lg:h-48 flex items-center justify-center">
                        <svg
                          width="176"
                          height="176"
                          viewBox="0 0 176 176"
                          className="absolute pointer-events-none w-full h-full"
                          style={{
                            filter: 'drop-shadow(0px 8.32px 21.64px #00000080)',
                          }}
                        >
                          <path
                            d="M 88 3.5 Q 98.5 3.5 105.6 10.6 L 154.9 42.2 Q 162 49.3 162 59.8 L 162 116.2 Q 162 126.7 154.9 133.8 L 105.6 165.4 Q 98.5 172.5 88 172.5 Q 77.5 172.5 70.4 165.4 L 21.1 133.8 Q 14 126.7 14 116.2 L 14 59.8 Q 14 49.3 21.1 42.2 L 70.4 10.6 Q 77.5 3.5 88 3.5 Z"
                            fill="rgba(231, 0, 11, 0.50)"
                            stroke="#FF83838C"
                            strokeWidth="1.07"
                          />
                        </svg>
                        <div className="absolute z-10 w-40 h-40 flex items-center justify-center p-8">
                          {trophy.logo && typeof trophy.logo !== 'string' && trophy.logo.url && (
                            <Image
                              src={trophy.logo.url}
                              alt={''}
                              width={100}
                              height={100}
                              className="object-contain max-w-full max-h-full"
                            />
                          )}
                        </div>
                        <div className="text-lg font-bold text-white bg-primary-red absolute bottom-2 right-6 w-10 h-10 flex items-center justify-center rounded-full z-20 shadow-lg">
                          {trophy.count < 10 ? '0' : ''}
                          {trophy.count}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-3xl blur-[20px] scale-105 opacity-15 -z-10 pointer-events-none glow-animation"
          style={{
            background:
              'linear-gradient(-30deg, rgba(220, 38, 38, 0.6), transparent, rgba(220, 38, 38, 0.4))',
          }}
        />
      </div>
    </div>
  )
}
