import React from 'react'
import { Metadata } from 'next'
import { TicketsClient } from './TicketsClient'

async function getMatchData(matchId: string) {
  // TODO: Replace with actual API call
  // const response = await fetch(`https://api.wydad.com/matches/${matchId}`)
  // const data = await response.json()
  // return data

  return {
    id: matchId,
    competition: 'Botola',
    matchday: 'Matchday 8',
    homeTeam: {
      name: 'WYDAD',
      logo: '/images/teams/wydad-logo.png',
    },
    awayTeam: {
      name: 'MARRAKECH',
      logo: '/images/teams/marrakech-logo.png',
    },
    venue: 'Stade Mohammed V',
    date: 'FRI 17 OCTOBER 2025',
    time: '20:45',
    ticketCategories: [
      {
        id: 'gate-4567',
        name: 'Gate 4/5/6/7',
        price: 60000,
        color: 'bg-green-500',
        available: true,
      },
      {
        id: 'gate-23',
        name: 'Gate 2/3',
        price: 150000,
        color: 'bg-orange-500',
        available: true,
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        price: 250000,
        color: 'bg-purple-500',
        available: true,
      },
      {
        id: 'vip',
        name: 'VIP',
        price: 500000,
        color: 'bg-blue-500',
        available: true,
      },
    ],
  }
}

type Args = {
  params: Promise<{
    matchId: string
    locale: string
  }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { matchId } = await paramsPromise
  const match = await getMatchData(matchId)

  return {
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} - Tickets | Wydad AC`,
    description: `Get your tickets for ${match.homeTeam.name} vs ${match.awayTeam.name} at ${match.venue}`,
  }
}

export default async function TicketsPage({ params: paramsPromise }: Args) {
  const { matchId } = await paramsPromise
  const match = await getMatchData(matchId)

  return <TicketsClient match={match} />
}
