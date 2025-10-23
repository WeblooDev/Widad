'use client'

import type { WydadMatches as WydadMatchesBlock } from '@/payload-types'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { MatchCard } from '@/components/MatchCard'
import { motion } from 'framer-motion'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'
import { useState, useEffect } from 'react'

interface ApiMatch {
  fixture: {
    id: number
    date: string
    venue: {
      name: string
      city: string
    }
    status: {
      short: string
      long: string
    }
  }
  league: {
    name: string
    round: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
    }
    away: {
      id: number
      name: string
      logo: string
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
}

export const WydadMatches: React.FC<WydadMatchesBlock & { locale: TypedLocale }> = ({
  title,
  link,
  locale,
}) => {
  const localizedTitle = getLocalizedField(title, locale)
  const localizedLabel = getLocalizedField(link?.label, locale)
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        // Wydad AC team ID in API-SPORTS is 968
        const response = await fetch('/api/football-matches?team=968')
        
        if (!response.ok) {
          throw new Error('Failed to fetch matches')
        }
        
        const data = await response.json()
        
        if (data.matches && data.matches.length > 0) {
          const formattedMatches = data.matches.slice(0, 3).map((match: ApiMatch) => {
            const isWydadHome = match.teams.home.id === 968
            const wydadScore = isWydadHome ? match.goals.home : match.goals.away
            const opponentScore = isWydadHome ? match.goals.away : match.goals.home
            const opponent = isWydadHome ? match.teams.away : match.teams.home
            const isOngoing = match.fixture.status.short === 'LIVE' || match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'HT'
            
            // Extract matchday from round string
            const matchdayMatch = match.league.round.match(/\d+/)
            const matchday = matchdayMatch ? parseInt(matchdayMatch[0]) : 1
            
            // Determine competition type
            const isCup = match.league.name.toLowerCase().includes('cup') || match.league.name.toLowerCase().includes('coupe')
            
            // Use API-SPORTS media URL for team logos
            const opponentLogoUrl = `https://media.api-sports.io/football/teams/${opponent.id}.png`
            
            return {
              id: match.fixture.id.toString(),
              botola: isCup ? 'cup' : 'ball',
              matchday: matchday,
              team1: isWydadHome ? 'wydad' : opponent.name.toLowerCase(),
              team1Image: isWydadHome ? '/wydad-logo.svg' : opponentLogoUrl,
              team2: isWydadHome ? opponent.name.toLowerCase() : 'wydad',
              team2Image: isWydadHome ? opponentLogoUrl : '/wydad-logo.svg',
              ongoing: isOngoing,
              team1Score: isWydadHome ? (wydadScore ?? 0) : (opponentScore ?? 0),
              team2Score: isWydadHome ? (opponentScore ?? 0) : (wydadScore ?? 0),
              date: match.fixture.date,
              time: new Date(match.fixture.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
              place: match.fixture.venue.name || 'Stadium',
            }
          })
          setMatches(formattedMatches)
        } else {
          // Fallback to mock data if no matches found
          setMatches(mockMatches)
        }
      } catch (err) {
        console.error('Error fetching matches:', err)
        setError('Failed to load matches')
        // Fallback to mock data on error
        setMatches(mockMatches)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])
  return (
    <div className="wydad-matches-bg py-20">
      <div className="flex flex-col gap-8 w-full container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-y-4">
          <motion.h2
            className="text-5xl lg:text-6xl font-semibold text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {localizedTitle || ''}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={link.url ? link.url : ''}
              className="flex justify-center items-center text-white text-sm font-bold uppercase hover:text-primary-red transition-colors"
            >
              {localizedLabel || ''} <ChevronRightIcon size={20} />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="text-center text-white py-12">
            <p>Loading matches...</p>
          </div>
        ) : error ? (
          <div className="text-center text-white py-12">
            <p>{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {matches.map((match, index) => (
              <motion.div
                key={match.id || index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Mock data as fallback
export const mockMatches = [
  {
    id: '1',
    botola: 'cup',
    matchday: 8,
    team1: 'asante kotoko',
    team1Image: '/images/homepage/icons/asante.svg',
    team2: 'wydad',
    team2Image: '/wydad-logo.svg',
    ongoing: true,
    team1Score: 0,
    team2Score: 1,
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
