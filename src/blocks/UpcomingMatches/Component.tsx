'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import type { UpcomingMatches as UpcomingMatchesBlock } from '@/payload-types'
import { UpcomingMatchCard } from '@/components/UpcomingMatchCard'
import { matches } from '../Homepage/WydadMatches/Component'

export const UpcomingMatches: React.FC<UpcomingMatchesBlock> = ({ title }) => {
  return (
    <div className="container flex flex-col gap-4">
      <h2 className="text-6xl font-semibold text-black capitalize">{title}</h2>
      <div className="flex flex-col gap-2">
        {matches.map((match) => (
          <UpcomingMatchCard key={match.date} match={match} />
        ))}
      </div>
    </div>
  )
}
