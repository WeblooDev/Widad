'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const words = ['WINNERS', 'NATION', 'FAMILY']

export const SplashScreen: React.FC<{ onComplete: () => void; contentReady: boolean }> = ({
  onComplete,
  contentReady,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAllWords, setShowAllWords] = useState(false)
  const [collapseWords, setCollapseWords] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [startCircularWipe, setStartCircularWipe] = useState(false)

  useEffect(() => {
    console.log('SplashScreen mounted')
    
    // Phase 1: Cycle through WINNERS -> NATION -> FAMILY
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1
        }
        clearInterval(wordTimer)
        // When we reach FAMILY, show all three words
        setTimeout(() => {
          setShowAllWords(true)
          
          // Then collapse them
          setTimeout(() => {
            setCollapseWords(true)
            
            // Show COMING SOON
            setTimeout(() => {
              setShowComingSoon(true)
              
              // Start circular wipe
              setTimeout(() => {
                if (contentReady) {
                  setStartCircularWipe(true)
                  setTimeout(() => {
                    onComplete()
                  }, 1500) // Duration of circular wipe
                }
              }, 1500) // Show COMING SOON for 1.5s
            }, 800) // Collapse duration
          }, 1000) // Show all words for 1s
        }, 500)
        return prev
      })
    }, 1200) // Change word every 1.2 seconds

    return () => {
      clearInterval(wordTimer)
    }
  }, [contentReady, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
    >
      <div className="container z-10 p-8 lg:p-12 absolute inset-0 flex flex-col justify-center items-center gap-8 h-full">
        {/* Phase 1 & 2: Single word morphing, then show all three */}
        {!showComingSoon && (
          <div className="relative">
            {!showAllWords ? (
              // Single word morphing
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentWordIndex}
                  className="text-[200px] leading-[200px] font-bold GC_Horizon uppercase text-center text-red-600"
                  initial={{ 
                    opacity: 0,
                    filter: 'blur(20px)',
                    scale: 0.8,
                  }}
                  animate={{ 
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  exit={{ 
                    opacity: 0,
                    filter: 'blur(20px)',
                    scale: 1.2,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {words[currentWordIndex]}
                </motion.h1>
              </AnimatePresence>
            ) : (
              // All three words stacked
              <div className="flex flex-col items-center">
                <motion.h1
                  className="text-[200px] leading-[200px] font-bold GC_Horizon uppercase text-center text-red-600"
                  initial={{ y: -300, opacity: 0 }}
                  animate={{ 
                    y: collapseWords ? 0 : 0,
                    opacity: collapseWords ? 0 : 1,
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  WINNERS
                </motion.h1>
                <motion.h1
                  className="text-[200px] leading-[200px] font-bold GC_Horizon uppercase text-center text-red-600"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ 
                    y: 0,
                    opacity: collapseWords ? 0 : 1,
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  NATION
                </motion.h1>
                <motion.h1
                  className="text-[200px] leading-[200px] font-bold GC_Horizon uppercase text-center text-red-600"
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ 
                    y: collapseWords ? 0 : 0,
                    opacity: collapseWords ? 0 : 1,
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  FAMILY
                </motion.h1>
              </div>
            )}
          </div>
        )}

        {/* Phase 3: COMING SOON */}
        {showComingSoon && (
          <motion.h1
            className="text-[200px] leading-[200px] font-bold GC_Horizon uppercase text-center text-red-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            COMING SOON
          </motion.h1>
        )}
      </div>

      {/* Circular Wipe */}
      {startCircularWipe && (
        <motion.div
          className="absolute inset-0 bg-white z-[60]"
          style={{
            clipPath: 'circle(0% at 50% 50%)',
          }}
          animate={{
            clipPath: 'circle(150% at 50% 50%)',
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </motion.div>
  )
}
