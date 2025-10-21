'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Player, Media as MediaType, Media } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { GlassButton } from '@/components/GlassButton'

interface PlayerModalProps {
  player: Player | null
  isOpen: boolean
  onClose: () => void
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !player) return null

  if (player.position === 'staff') return null

  const cardImage = player.image as MediaType
  const modalImg = player.modalImage as MediaType
  const playerImage = modalImg?.url ? modalImg : cardImage
  const flagImage = player.nationalityFlag as MediaType

  const calculateAge = (dateOfBirth: string | null | undefined) => {
    if (!dateOfBirth) return null
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const age = calculateAge(player.dateOfBirth)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#8B0000] to-[#2D0000] rounded-[10px] sm:rounded-[20px] w-full max-w-full sm:max-w-[95%] lg:max-w-[80%] max-h-[95vh] sm:max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 player-modal-bg" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition-colors z-20 bg-black/30 rounded-full p-1 sm:p-0 sm:bg-transparent"
        >
          <X size={24} className="sm:w-8 sm:h-8" />
        </button>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 max-h-[95vh] sm:max-h-[90vh]">
          {/* Left Side - Content */}
          <div className="p-4 sm:p-6 lg:p-12 text-white overflow-y-auto order-2 lg:order-1 max-h-[50vh] lg:max-h-full">
            {/* Header */}
            <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-primary-red rounded-full" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase">
                  {player.name}
                </h2>
              </div>

              <div className="inline-block bg-primary-red px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {player.position?.replace(/^\w/, (c) => c.toUpperCase())} Stats
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-white/60 min-w-[80px] sm:min-w-[100px]">
                  Nationality
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold">
                  {player.nationality || 'N/A'}
                </div>
              </div>
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-white/60 min-w-[80px] sm:min-w-[100px]">
                  Birthday
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold">
                  {player.dateOfBirth
                    ? new Date(player.dateOfBirth).toLocaleDateString('en-GB')
                    : 'N/A'}
                </div>
              </div>
            </div>

            {/* Stats Section - Defender */}
            {player.position === 'defender' && player.statistics && (
              <div className="mb-4 sm:mb-6 lg:mb-8 space-y-3 sm:space-y-4">
                <div className="inline-block bg-primary-red px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2">
                  SEASON 2024/25
                </div>

                {/* Matches Played */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Matches Played</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.appearances || 0}
                  </div>
                </div>

                {/* Blocks */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Blocks</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.blocks || 0}
                  </div>
                </div>

                {/* Goals */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Goals</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.goals || 0}
                  </div>
                </div>

                {/* Assists */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Assists</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.assists || 0}
                  </div>
                </div>

                {/* Passing Accuracy */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Passing Accuracy</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 mt-1">
                      <div
                        className="bg-primary-red h-full rounded-full transition-all duration-500"
                        style={{ width: `${player.statistics.passingAccuracy || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.passingAccuracy || 0}%
                  </div>
                </div>

                {/* Duels Won */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Duels Won</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 mt-1">
                      <div
                        className="bg-primary-red h-full rounded-full transition-all duration-500"
                        style={{ width: `${player.statistics.duelsWon || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.duelsWon || 0}%
                  </div>
                </div>
              </div>
            )}

            {/* Stats Section - Midfielder */}
            {player.position === 'midfielder' && player.statistics && (
              <div className="mb-4 sm:mb-6 lg:mb-8 space-y-3 sm:space-y-4">
                <div className="inline-block bg-primary-red px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2">
                  SEASON 2024/25
                </div>

                {/* Matches Played */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Matches Played</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.appearances || 0}
                  </div>
                </div>

                {/* Assists */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Assists</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.assists || 0}
                  </div>
                </div>

                {/* Goals */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Goals</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.goals || 0}
                  </div>
                </div>

                {/* Key Passes */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Key Passes</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.keyPasses || 0}
                  </div>
                </div>

                {/* Chances Created */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Chances Created</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.chancesCreated || 0}
                  </div>
                </div>

                {/* Passing Accuracy */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Passing Accuracy</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 mt-1">
                      <div
                        className="bg-primary-red h-full rounded-full transition-all duration-500"
                        style={{ width: `${player.statistics.passingAccuracy || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.passingAccuracy || 0}%
                  </div>
                </div>
              </div>
            )}

            {/* Stats Section - Forward */}
            {player.position === 'forward' && player.statistics && (
              <div className="mb-4 sm:mb-6 lg:mb-8 space-y-3 sm:space-y-4">
                <div className="inline-block bg-primary-red px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2">
                  SEASON 2024/25
                </div>

                {/* Matches Played */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Matches Played</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.appearances || 0}
                  </div>
                </div>

                {/* Goals */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Goals</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.goals || 0}
                  </div>
                </div>

                {/* Assists */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Assists</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.assists || 0}
                  </div>
                </div>

                {/* Shots on Target */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Shots on Target</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.shotsOnTarget || 0}
                  </div>
                </div>

                {/* Chances Created */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Chances Created</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.chancesCreated || 0}
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-white/60">Conversion Rate</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 mt-1">
                      <div
                        className="bg-primary-red h-full rounded-full transition-all duration-500"
                        style={{ width: `${player.statistics.conversionRate || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {player.statistics.conversionRate || 0}%
                  </div>
                </div>
              </div>
            )}

            {/* Bio */}
            {player.bio && (
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">{player.bio}</p>
              </div>
            )}

            {/* Download Card Button */}
            <GlassButton
              link="Download Card"
              url={(player.modalImage as Media)?.url || ''}
              icon={() =>
                (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                ) as React.ReactNode
              }
            />
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-full lg:min-h-0 order-1 lg:order-2">
            {playerImage?.url && (
              <Image
                src={playerImage.url}
                alt={player.name}
                fill
                className="object-cover object-top lg:object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
