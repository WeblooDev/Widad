'use client'

import React from 'react'
import { MatchInfo } from '@/components/MatchInfo'
import { TicketPricing } from '@/components/TicketPricing'
import { useRouter } from 'next/navigation'

interface TicketCategory {
  id: string
  name: string
  price: number
  color: string
  available: boolean
}

interface MatchData {
  id: string
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
  ticketCategories: TicketCategory[]
}

interface TicketsClientProps {
  match: MatchData
}

export const TicketsClient: React.FC<TicketsClientProps> = ({ match }) => {
  const router = useRouter()

  const handleBuyTicket = (categoryId: string) => {
    // TODO: Implement ticket purchase flow
    // This could redirect to a payment page or open a modal
    console.log('Buying ticket for category:', categoryId)

    // Example: redirect to checkout
    // router.push(`/checkout?match=${match.id}&category=${categoryId}`)

    // For now, just show an alert
    const category = match.ticketCategories.find((c) => c.id === categoryId)
    if (category) {
      alert(
        `Redirecting to purchase ${category.name} ticket for ${category.price.toLocaleString()}DH`,
      )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        {/* Left Side - Match Info */}
        <MatchInfo
          competition={match.competition}
          matchday={match.matchday}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          venue={match.venue}
          date={match.date}
          time={match.time}
        />

        {/* Right Side - Ticket Pricing */}
        <div className="bg-[#f5f5f5] p-8 lg:p-20 col-span-2">
          {/* Header */}
          <div className="mb-8">
            <span className="text-primary-red text-lg font-normal">— Tickets</span>
            <h1 className="text-5xl font-normal mt-2">Get Your Seat.</h1>
          </div>
          <TicketPricing categories={match.ticketCategories} onBuyTicket={handleBuyTicket} />
        </div>
      </div>
    </div>
  )
}
