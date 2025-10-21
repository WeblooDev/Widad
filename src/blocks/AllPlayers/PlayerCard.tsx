'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Player, Media as MediaType, Media } from '@/payload-types'
import { GlassButton } from '@/components/GlassButton'
import { motion } from 'framer-motion'

interface PlayerCardProps {
  player: Player
  onClick: () => void
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [animatedSavePercentage, setAnimatedSavePercentage] = useState(0)
  const [animatedDistributionAccuracy, setAnimatedDistributionAccuracy] = useState(0)
  const [animatedPassingAccuracy, setAnimatedPassingAccuracy] = useState(0)
  const [animatedDuelsWon, setAnimatedDuelsWon] = useState(0)
  const playerImage = player.image as MediaType
  const flagImage = player.nationalityFlag as MediaType

  const positionLabel = player.position?.toUpperCase() || ''
  const isStaff = player.position === 'staff'

  // Animate percentages when hovered
  useEffect(() => {
    if (isHovered) {
      const savePercentage = player.statistics?.savePercentage || 0
      const distributionAccuracy = player.statistics?.distributionAccuracy || 0
      const passingAccuracy = player.statistics?.passingAccuracy || 0
      const duelsWon = player.statistics?.duelsWon || 0

      const duration = 1000 // 1 second
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedSavePercentage(Math.round(savePercentage * progress))
        setAnimatedDistributionAccuracy(Math.round(distributionAccuracy * progress))
        setAnimatedPassingAccuracy(Math.round(passingAccuracy * progress))
        setAnimatedDuelsWon(Math.round(duelsWon * progress))

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    } else {
      setAnimatedSavePercentage(0)
      setAnimatedDistributionAccuracy(0)
      setAnimatedPassingAccuracy(0)
      setAnimatedDuelsWon(0)
    }
  }, [
    isHovered,
    player.statistics?.savePercentage,
    player.statistics?.distributionAccuracy,
    player.statistics?.passingAccuracy,
    player.statistics?.duelsWon,
  ])

  return (
    <motion.div
      className="relative rounded-[20px] overflow-hidden group aspect-[3/4]"
      style={{ cursor: isStaff ? 'default' : 'pointer' }}
      onMouseEnter={() => !isStaff && setIsHovered(true)}
      onMouseLeave={() => !isStaff && setIsHovered(false)}
      onClick={isStaff ? undefined : onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={isStaff ? {} : { scale: 1.03 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] to-[#2D0000]">
        {playerImage?.url && (
          <Image src={playerImage.url} alt={player.name} fill className="object-cover object-top" />
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Jersey Number - Top Left (hidden for staff) */}
      {!isStaff && (
        <div className="absolute top-6 left-6 text-white text-5xl font-bold z-10">
          {player.jerseyNumber}
        </div>
      )}

      {/* Position Label - Right Side Vertical */}
      <div className="absolute top-6 right-6 z-10">
        <div className="flex flex-col items-center gap-2">
          {/* Flag */}
          {flagImage?.url && (
            <div className="w-8 h-6 relative rounded overflow-hidden">
              <Image
                src={flagImage.url}
                alt={player.nationality || ''}
                fill
                className="object-cover"
              />
            </div>
          )}
          {/* Vertical divider */}
          <div className="w-px h-8 bg-white/30" />
          {/* Position text vertical */}
          <div className="writing-mode-vertical text-white text-xs font-medium tracking-wider">
            {positionLabel}
          </div>
        </div>
      </div>

      {/* Player Name - Bottom */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <h3 className="text-white text-2xl font-bold uppercase">{player.name}</h3>
      </div>

      {/* Team Logo - Bottom Right */}
      <div className="absolute bottom-6 right-6 w-8 h-8 z-10">
        <div className="w-full h-full bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
          {/* Placeholder for team logo - you can add team logo here */}
          <Image src="/icons/wac-logo-white.svg" alt="WAC Logo" fill className="object-cover" />
        </div>
      </div>

      {/* Hover Stats Overlay (hidden for staff) */}
      {!isStaff && (
        <div
          className={`absolute inset-0  transition-opacity duration-300 z-30 stats-card-bg ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* <div className="absolute inset-0  opacity-100" /> */}

          <div className="relative text-white p-4 h-full flex flex-col overflow-hidden">
            {/* Header Section - Slides up */}
            <div
              className={`transition-transform duration-500 ease-out ${
                isHovered ? '-translate-y-0' : 'translate-y-8'
              }`}
            >
              {/* Header with name and logo */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary-red rounded-full" />
                  <h4 className="text-lg font-bold uppercase">{player.name}</h4>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <Image
                    src="/icons/wac-logo-white.svg"
                    alt="WAC Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Position Title */}
              <h5 className="text-base font-medium mb-1 capitalize">{positionLabel} Stats</h5>

              {/* Season Badge */}
              <div className="inline-block bg-primary-red px-3 py-0.5 rounded-full text-[10px] font-semibold mb-5 self-start">
                SEASON 2024/25
              </div>
            </div>

            {/* Stats List - Slides up from bottom */}
            <div
              className={`space-y-1.5 flex-1 flex flex-col justify-between transition-all duration-700 ease-out ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <div
                className={`flex items-center justify-between transition-all duration-300 delay-100 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">Matches Played</span>
                </div>
                <span className="text-lg font-bold">{player.statistics?.appearances || 0}</span>
              </div>

              {player.position === 'goalkeeper' ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Clean Sheets</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.cleanSheets || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Saves Made</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.savesMade || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Goals Conceded</span>
                    </div>
                    <span className="text-lg font-bold">
                      {player.statistics?.goalsConceded || 0}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2 justify-between">
                          <span className="text-sm">Save Percentage</span>
                          <span className="text-lg font-bold">{animatedSavePercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-600 to-pink-600 h-full transition-all duration-75"
                            style={{ width: `${animatedSavePercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Distribution Accuracy</span>
                          </div>
                          <span className="text-lg font-bold">{animatedDistributionAccuracy}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-600 to-pink-600 h-full transition-all duration-75"
                            style={{ width: `${animatedDistributionAccuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : player.position === 'defender' ? (
                <>
                  {/* Defender Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Blocks</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.blocks || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Goals</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.goals || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Assists</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.assists || 0}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2 justify-between">
                          <span className="text-sm">Passing Accuracy</span>
                          <span className="text-lg font-bold">{animatedPassingAccuracy}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-600 to-pink-600 h-full transition-all duration-75"
                            style={{ width: `${animatedPassingAccuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <div className="flex items-center gap-2 justify-between">
                            <span className="text-sm">Duels won</span>
                            <span className="text-lg font-bold">{animatedDuelsWon}%</span>
                          </div>
                          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-red-600 to-pink-600 h-full transition-all duration-75"
                              style={{ width: `${animatedDuelsWon}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : player.position === 'midfielder' ? (
                <>
                  {/* Midfielder Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Key Passes</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.keyPasses || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Assists</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.assists || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Goals</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.goals || 0}</span>
                  </div>
                </>
              ) : player.position === 'forward' ? (
                <>
                  {/* Forward Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Goals</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.goals || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Shots on Target</span>
                    </div>
                    <span className="text-lg font-bold">
                      {player.statistics?.shotsOnTarget || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Assists</span>
                    </div>
                    <span className="text-lg font-bold">{player.statistics?.assists || 0}</span>
                  </div>
                </>
              ) : null}

              <GlassButton
                link="More details"
                url={(player.modalImage as Media)?.url || ''}
                icon={() => <></>}
                className="w-full text-sm py-2"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
