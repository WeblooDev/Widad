'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { Instagram, Volume2, VolumeX } from 'lucide-react'
import './styles.css'

export const ComingSoonHero: React.FC<Page['hero']> = ({ media }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const t = useTranslations()
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const words = [t('hero.words.winners'), t('hero.words.nation'), t('hero.words.family')]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [counterMode, setCounterMode] = useState(false)
  const [counterIndex, setCounterIndex] = useState(0)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  })

  useEffect(() => {
    const tryAutoplayWithSound = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = false
          await videoRef.current.play()
          setIsMuted(false)
        } catch (error) {
          // If autoplay with sound fails, mute and play
          videoRef.current.muted = true
          setIsMuted(true)
          try {
            await videoRef.current.play()
          } catch (e) {
            console.log('Autoplay failed')
          }
        }
      }
    }

    const timer = setTimeout(tryAutoplayWithSound, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Show nav after animation completes
  useEffect(() => {
    if (showComingSoon) {
      setTimeout(() => {
        setShowNav(true)
      }, 800) // Show nav 800ms after COMING SOON appears
    }
  }, [showComingSoon])

  useEffect(() => {
    // Phase 1: Cycle through WINNERS -> NATION -> FAMILY (slow)
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1
        }
        clearInterval(wordTimer)

        // Phase 2: Start counter effect (slow to fast)
        setTimeout(() => {
          setCounterMode(true)
          let count = 0
          let currentDelay = 200 // Start slow

          const scheduleNext = () => {
            setTimeout(() => {
              count++
              setCounterIndex(count % words.length)

              // Gradually speed up
              currentDelay = Math.max(30, currentDelay * 0.85) // Speed up by 15% each time, min 30ms

              // After ~25 cycles, transition to COMING SOON
              if (count >= 25) {
                setTimeout(() => {
                  setShowComingSoon(true)
                }, 100)
              } else {
                scheduleNext()
              }
            }, currentDelay)
          }

          scheduleNext()
        }, 600)

        return prev
      })
    }, 1400) // Change word every 1.4 seconds

    return () => {
      clearInterval(wordTimer)
    }
  }, [])

  // Powerful easing for impact
  const impactEasing: [number, number, number, number] = [0.87, 0, 0.13, 1] // Custom easeInOutExpo for dramatic effect

  // Block scroll during animation
  useEffect(() => {
    if (!showNav) {
      // Block scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Enable scroll after animation
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showNav])

  // Hide/show header based on animation state
  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      if (showNav) {
        header.style.opacity = '0'
        header.style.transform = 'translateY(-20px)'
        setTimeout(() => {
          header.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          header.style.opacity = '1'
          header.style.transform = 'translateY(0)'
        }, 50)
      } else {
        header.style.opacity = '0'
        header.style.pointerEvents = 'none'
      }
    }

    return () => {
      if (header) {
        header.style.opacity = '1'
        header.style.pointerEvents = 'auto'
        header.style.transform = 'translateY(0)'
      }
    }
  }, [showNav])

  return (
    <div className="-mt-14 relative flex items-end justify-center bg-black text-white min-h-[100vh] overflow-hidden">
      <div className="container mb-16 z-10 p-8 lg:p-12 absolute inset-0 flex flex-col justify-center items-center gap-4 lg:gap-8 h-full">
        <motion.p
          className={`text-lg font-normal uppercase ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showComingSoon ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Animated Text Section */}
        <div className="relative h-[120px] md:h-[200px] flex items-center justify-center">
          {!showComingSoon ? (
            !counterMode ? (
              // Phase 1: Single word morphing (slow)
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentWordIndex}
                  className={`text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[80px] sm:leading-[120px] md:leading-[160px] lg:leading-[200px] font-bold uppercase text-center text-red-600 absolute whitespace-nowrap ${isArabic ? 'IBMPlexSansArabic-SemiBold' : 'GC_Horizon'}`}
                  initial={{
                    opacity: 0,
                    filter: 'blur(20px)',
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    filter: 'blur(20px)',
                    scale: 1.3,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: impactEasing,
                  }}
                >
                  {words[currentWordIndex]}
                </motion.h1>
              </AnimatePresence>
            ) : (
              // Phase 2: Fast counter effect
              <motion.h1
                className={`text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[80px] sm:leading-[120px] md:leading-[160px] lg:leading-[200px] font-bold uppercase text-center text-red-600 absolute whitespace-nowrap ${isArabic ? 'IBMPlexSansArabic-SemiBold' : 'GC_Horizon'}`}
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 0.08,
                  repeat: Infinity,
                }}
              >
                {words[counterIndex]}
              </motion.h1>
            )
          ) : (
            // Phase 3: COMING SOON
            <motion.h1
              className={`text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[80px] sm:leading-[120px] md:leading-[160px] lg:leading-[200px] font-bold uppercase text-center absolute whitespace-nowrap ${isArabic ? 'IBMPlexSansArabic-SemiBold' : 'GC_Horizon'}`}
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(30px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1.2,
                ease: impactEasing,
              }}
            >
              {t('hero.comingSoon')}
            </motion.h1>
          )}
        </div>

        <motion.p
          className={`text-xs sm:text-sm font-normal uppercase w-[90%] sm:w-[25.5rem] text-center px-4 sm:px-0 ${isArabic ? 'IBMPlexSansArabic-SemiBold' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showComingSoon ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: showComingSoon ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-social-button flex items-center justify-center w-12 h-12 text-white rounded-[14px] transition-all"
          >
            <Instagram size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-social-button flex items-center justify-center w-12 h-12 text-white rounded-[14px] transition-all"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.872 13.7319L30.496 0.5H27.7425L17.645 11.9867L9.58623 0.5H0.289062L12.4782 17.8716L0.289062 31.7455H3.04262L13.6989 19.6126L22.2114 31.7455H31.5086M4.03644 2.53343H8.26669L27.7404 29.812H23.5091" />
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="min-h-[100dvh] lg:min-h-[100vh] select-none">
        {media && typeof media === 'object' && (
          <>
            <Media
              fill
              imgClassName="object-cover"
              className="w-full h-full object-cover absolute inset-0"
              priority
              resource={media}
              videoClassName="object-cover max-md:h-full "
              ref={videoRef}
            />
            {/* Unmute button */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted
                  setIsMuted(!isMuted)
                }
              }}
              className="glass-social-button !absolute bottom-8 right-8 z-20 flex items-center justify-center w-14 h-14 text-white rounded-[14px] transition-all hover:scale-110"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </>
        )}
        {/* Black to transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  )
}
