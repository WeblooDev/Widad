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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase">{player.name}</h2>
              </div>

              <div className="inline-block bg-primary-red px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {player.position?.replace(/^\w/, (c) => c.toUpperCase())} Stats
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-white/60 min-w-[80px] sm:min-w-[100px]">Nationality</div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold">{player.nationality || 'N/A'}</div>
              </div>
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-white/60 min-w-[80px] sm:min-w-[100px]">Birthday</div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold">
                  {player.dateOfBirth
                    ? new Date(player.dateOfBirth).toLocaleDateString('en-GB')
                    : 'N/A'}
                </div>
              </div>
            </div>

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
