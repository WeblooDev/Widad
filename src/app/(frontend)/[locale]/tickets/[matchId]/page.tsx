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
    competition: 'ball',
    matchday: '8',
    homeTeam: {
      name: 'WYDAD',
      logo: '/wydad-logo.svg',
    },
    awayTeam: {
      name: 'MARRAKECH',
      logo: '/icons/marrakesh.svg',
    },
    venue: 'Stade Mohammed V',
    date: 'FRI 17 OCTOBER 2025',
    time: '20:45',
    ticketCategories: [
      {
        id: 'gate-4567',
        name: 'Gate 4/5/6/7',
        price: 60,
        color: 'bg-green-500',
        available: true,
      },
      {
        id: 'gate-23',
        name: 'Gate 2/3',
        price: 150,
        color: 'bg-orange-500',
        available: true,
      },
      {
        id: 'premium',
        name: 'PREMIUM',
        price: 250,
        color: 'bg-purple-500',
        available: true,
      },
      {
        id: 'vip',
        name: 'VIP',
        price: 400,
        color: 'bg-blue-500',
        available: true,
      },
      {
        id: 'v-vip',
        name: 'V-VIP',
        price: 2000,
        color: 'bg-pink-500',
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
