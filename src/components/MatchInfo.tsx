import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { formatDate } from './MatchCard'

interface MatchInfoProps {
  competition: string
  matchday: string
  homeTeam: {
    name: string
    logo: string
  }
  awayTeam: {
    name: string
    logo: string
  }
  venue: string
  date: string
  time: string
}

export const MatchInfo: React.FC<MatchInfoProps> = ({
  competition: botola,
  matchday,
  homeTeam: team1,
  awayTeam: team2,
  venue: place,
  date,
  time,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-10 p-8 overflow-hidden justify-center items-center h-full text-center match-grid-image',
      )}
    >
      <div className="flex flex-col justify-center items-center gap-5">
        <Image
          src={
            botola === 'ball'
              ? '/images/homepage/icons/botola-ball.svg'
              : '/images/homepage/icons/botola-cup.svg'
          }
          alt="Botola"
          width={54}
          height={60}
          className="max-w-[54px] max-h-[60px]"
        />

        <h3 className="text-sm font-medium text-white">Botola • Matchday {matchday}</h3>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-5xl font-bold text-white uppercase GC_Horizon">
            {team1.name} vs {team2.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center gap-6">
        <Image src={team1.logo} alt="team logo" width={100} height={100} />
        <h3 className={cn('font-medium text-white uppercase text-5xl GC_Horizon')}>vs</h3>
        <Image src={team2.logo} alt="team logo" width={100} height={100} />
      </div>

      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="text-sm font-medium text-white">{place}</h3>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-sm font-bold text-white uppercase">
            {formatDate(date)} - {time}
          </h3>
        </div>
      </div>
    </div>
  )
}
