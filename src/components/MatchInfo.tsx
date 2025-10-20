import React from 'react'
import Image from 'next/image'

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
  competition,
  matchday,
  homeTeam,
  awayTeam,
  venue,
  date,
  time,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#8B0000] to-[#2D0000] text-white p-8 rounded-[20px] h-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/match-bg-pattern.png')] bg-cover opacity-20" />

      <div className="relative z-10 text-center w-full">
        {/* Competition Badge */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Image
              src="/icons/wac-logo-white.svg"
              alt="Competition"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Competition Name */}
        <div className="text-sm mb-2 opacity-90">
          {competition} • {matchday}
        </div>

        {/* Match Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wide">
          {homeTeam.name} VS {awayTeam.name}
        </h1>

        {/* Team Logos */}
        <div className="flex items-center justify-center gap-8 mb-8">
          {/* Home Team */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 relative mb-2">
              <Image src={homeTeam.logo} alt={homeTeam.name} fill className="object-contain" />
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            </div>
          </div>

          {/* VS */}
          <div className="text-3xl font-bold opacity-50">VS</div>

          {/* Away Team */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 relative mb-2">
              <Image src={awayTeam.logo} alt={awayTeam.name} fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-1 text-sm">
          <div className="opacity-90">{venue}</div>
          <div className="font-semibold text-lg">
            {date} - {time}
          </div>
        </div>
      </div>
    </div>
  )
}
