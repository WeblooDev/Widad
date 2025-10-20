'use client'

import React from 'react'
import { Ticket } from 'lucide-react'

interface TicketCategory {
  id: string
  name: string
  price: number
  color: string
  available: boolean
}

interface TicketPricingProps {
  categories: TicketCategory[]
  onBuyTicket: (categoryId: string) => void
}

export const TicketPricing: React.FC<TicketPricingProps> = ({ categories, onBuyTicket }) => {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="flex items-stretch rounded-[10px] overflow-hidden">
          {/* Color Bar */}
          <div className={`w-2 ${category.color}`} />

          {/* Content */}
          <div className="flex-1 bg-white p-6 flex flex-col lg:flex-row items-start lg:items-end gap-4 justify-between border-b border-gray-100">
            <div>
              <h3 className="text-2xl font-normal mb-5">{category.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 text-md">Price</span>
                <span className="text-5xl font-bold text-primary-red GC_Horizon">
                  {category.price.toLocaleString()}.00DH
                </span>
              </div>
            </div>

            <button
              onClick={() => onBuyTicket(category.id)}
              disabled={!category.available}
              className={`flex items-center gap-2 px-6 py-3 rounded-[10px] overflow-hidden font-medium transition-all text-xs self-end lg:self-auto ${
                category.available
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Ticket size={20} />
              <span>{category.available ? 'Buy Ticket' : 'Sold Out'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
