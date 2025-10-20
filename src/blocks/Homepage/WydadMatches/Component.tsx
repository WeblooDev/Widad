import type { WydadMatches as WydadMatchesBlock } from '@/payload-types'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { MatchCard } from '@/components/MatchCard'

export const WydadMatches: React.FC<WydadMatchesBlock> = ({ title, link }) => {
  return (
    <div className="wydad-matches-bg py-20">
      <div className="flex flex-col gap-8 w-full container">
        <div className="flex flex-row justify-between items-end">
          <h2 className="text-6xl font-semibold text-white">{title}</h2>

          <Link
            href={link.url ? link.url : ''}
            className="flex justify-center items-center text-white text-sm font-bold uppercase"
          >
            {link.label} <ChevronRightIcon size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const matches = [
  {
    id: '1',
    botola: 'cup',
    matchday: 8,
    team1: 'wydad',
    team1Image: '/wydad-logo.svg',
    team2: 'asante kotoko',
    team2Image: '/images/homepage/icons/asante.svg',
    ongoing: true,
    team1Score: 4,
    team2Score: 0,
    date: '2025-10-19',
    time: '20:45',
    place: 'Stade Mohammed V',
  },
  {
    id: '2',
    botola: 'cup',
    matchday: 8,
    team1: 'wydad',
    team1Image: '/wydad-logo.svg',
    team2: 'asante kotoko',
    team2Image: '/images/homepage/icons/asante.svg',
    ongoing: false,
    team1Score: 0,
    team2Score: 0,
    date: '2025-10-24',
    time: '20:45',
    place: 'Stade Mohammed V',
  },
  {
    id: '3',
    botola: 'ball',
    matchday: 8,
    team1: 'wydad',
    team1Image: '/wydad-logo.svg',
    team2: 'raja',
    team2Image: '/images/homepage/icons/raja.svg',
    ongoing: false,
    team1Score: 0,
    team2Score: 0,
    date: '2025-10-29',
    time: '20:45',
    place: 'Stade Mohammed V',
  },
]
