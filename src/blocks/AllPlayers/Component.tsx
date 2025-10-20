'use client'

import React, { useState, useEffect } from 'react'
import type { AllPlayers as AllPlayersType, Player, Team } from '@/payload-types'
import { PlayerCard } from './PlayerCard'
import { PlayerModal } from './PlayerModal'

interface AllPlayersProps extends AllPlayersType {
  locale?: string
}

type Position = 'goalkeeper' | 'defender' | 'midfielder' | 'forward' | 'staff'

const POSITION_LABELS: Record<Position, string> = {
  goalkeeper: 'GOALKEEPERS',
  defender: 'DEFENDERS',
  midfielder: 'MIDFIELDERS',
  forward: 'FORWARDS',
  staff: 'STAFF',
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'goalkeeper', label: 'Goalkeepers' },
  { value: 'defender', label: 'Defenders' },
  { value: 'midfielder', label: 'Midfielders' },
  { value: 'forward', label: 'Forwards' },
  { value: 'staff', label: 'Staff' },
  { value: 'onLoan', label: 'On Loan' },
]

export const AllPlayers: React.FC<AllPlayersProps> = ({ title, team, showFilters, locale }) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const teamId = typeof team === 'object' ? team.id : team

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/players?where[team][equals]=${teamId}&depth=1&locale=${locale || 'en'}`,
        )
        const data = await response.json()
        setPlayers(data.docs || [])
      } catch (error) {
        console.error('Error fetching players:', error)
      } finally {
        setLoading(false)
      }
    }

    if (teamId) {
      fetchPlayers()
    }
  }, [teamId, locale])

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedPlayer(null), 300)
  }

  // Filter players
  const filteredPlayers =
    selectedFilter === 'all'
      ? players
      : selectedFilter === 'onLoan'
        ? players.filter((p) => p.status === 'onLoan')
        : players.filter((p) => p.position === selectedFilter)

  // Group players by position
  const groupedPlayers: Record<Position, Player[]> = {
    goalkeeper: [],
    defender: [],
    midfielder: [],
    forward: [],
    staff: [],
  }

  filteredPlayers.forEach((player) => {
    if (player.position && player.position in groupedPlayers) {
      groupedPlayers[player.position as Position].push(player)
    }
  })

  // Sort positions to display in order
  const positionOrder: Position[] = ['goalkeeper', 'defender', 'midfielder', 'forward', 'staff']

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container">
          <div className="text-center">Loading players...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-white">
      <div className="container">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold mb-8">{title || 'All Players'}</h1>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 mb-12 bg-[#F5F5F5] p-2 w-fit rounded-[10px]">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-3 py-2 rounded-[10px] font-medium transition-colors text-xs ${
                  selectedFilter === option.value
                    ? 'bg-primary-red text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Players Grid by Position */}
        {positionOrder.map((position) => {
          const positionPlayers = groupedPlayers[position]
          if (positionPlayers.length === 0) return null

          return (
            <div key={position} className="mb-16">
              {/* Position Title */}
              <h2 className="text-4xl font-bold mb-8 uppercase">{POSITION_LABELS[position]}</h2>

              {/* Players Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {positionPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onClick={() => handlePlayerClick(player)}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {/* No Players Message */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12 text-gray-500">No players found for this filter.</div>
        )}
      </div>

      {/* Player Modal */}
      <PlayerModal player={selectedPlayer} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
