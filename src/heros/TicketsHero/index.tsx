'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { MatchCard } from '@/components/MatchCard'
import { matches } from '@/blocks/Homepage/WydadMatches/Component'

export const TicketsHero: React.FC<Page['hero']> = (props) => {
  const { subtitle, richText, description, links, media } = props as Page['hero'] & {
    subtitle?: string | null
    description?: string | null
  }

  return (
    <div className="py-20">
      <div className="container">
        {/* Content section */}
        <div className="grid grid-cols-2 gap-12 mb-12 relative">
          {/* Left column: Subtitle and Title */}
          <div className="flex flex-col gap-6">
            {subtitle && <p className="text-primary-red text-2xl font-normal">{subtitle}</p>}
            {richText && (
              <div className="text-black [&_h1]:text-5xl [&_h1]:leading-[5xl] [&_h2]:text-5xl [&_h2]:leading-[5xl] [&_p]:text-5xl [&_p]:leading-[5xl]">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
            {description && <p className="text-lg text-gray-700 leading-lg">{description}</p>}
          </div>

          {/* Right column: Description and Link */}
          <div className="absolute top-0 right-20 flex flex-col justify-between items-start">
            <MatchCard match={matches[0]} />
          </div>
        </div>

        {/* Image section - full width */}
        {media && typeof media === 'object' && (
          <div className="w-full rounded-[20px] overflow-hidden max-h-[70vh]">
            <Media resource={media} imgClassName="w-full h-auto object-cover" />
          </div>
        )}
      </div>
    </div>
  )
}
