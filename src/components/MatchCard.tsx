import { cn } from '@/utilities/ui'
import Image from 'next/image'

interface MatchCardProps {
  match: {
    botola: string
    matchday: number
    team1: string
    team1Image: string
    team2: string
    team2Image: string
    ongoing: boolean
    team1Score: number
    team2Score: number
    date: string
    time: string
    place: string
  }
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 p-8 rounded-[10px] overflow-hidden justify-center items-center h-full text-center',
        match.ongoing ? 'current-match-bg' : 'upcoming-match-bg',
      )}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Image
          src={
            match.botola === 'ball'
              ? '/images/homepage/icons/botola-ball.svg'
              : '/images/homepage/icons/botola-cup.svg'
          }
          alt="Botola"
          width={54}
          height={60}
          className="max-w-[54px] max-h-[60px]"
        />

        <h3 className="text-sm font-medium text-white">Botola • Matchday {match.matchday}</h3>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-4xl font-bold text-white uppercase GC_Horizon">
            {match.team1} vs {match.team2}
          </h3>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center gap-3">
        <Image src={match.team1Image} alt="team logo" width={65} height={75} />
        <h3
          className={cn(
            'font-medium text-white uppercase',
            match.ongoing ? 'text-7xl Built-Titling' : 'text-2xl GC_Horizon',
          )}
        >
          {match.ongoing ? `${match.team1Score} - ${match.team2Score}` : 'vs'}
        </h3>
        <Image src={match.team2Image} alt="team logo" width={65} height={75} />
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-md font-bold text-white uppercase">
            {formatDate(match.date)} - {match.time}
          </h3>
        </div>

        <h3 className="text-sm font-medium text-white">{match.place}</h3>
      </div>

      <button className="bg-white text-black rounded-[9px] py-3 px-5 overflow-hidden text-sm font-bold">
        {match.ongoing ? (
          'Match'
        ) : (
          <p className="flex flex-row justify-center items-center gap-2">
            <Image
              src="/images/homepage/icons/ticketplace.svg"
              width={20}
              height={20}
              alt="ticketplace"
            />
            Ticketplace
          </p>
        )}
      </button>
    </div>
  )
}
