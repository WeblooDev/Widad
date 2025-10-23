'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import type { UpcomingMatches as UpcomingMatchesBlock } from '@/payload-types'
import { UpcomingMatchCard } from '@/components/UpcomingMatchCard'
import { mockMatches as matches } from '../Homepage/WydadMatches/Component'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

export const UpcomingMatches: React.FC<UpcomingMatchesBlock & { locale: TypedLocale }> = ({ title, locale }) => {
  const localizedTitle = getLocalizedField(title, locale)
  return (
    <div className="container flex flex-col gap-4">
      <h2 className="text-5xl lg:text-6xl font-semibold text-black capitalize">{localizedTitle || ''}</h2>
      <div className="flex flex-col gap-2">
        {matches.map((match) => (
          <UpcomingMatchCard key={match.date} match={match} />
        ))}
      </div>
    </div>
  )
}
