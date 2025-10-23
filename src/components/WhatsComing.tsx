'use client'

import React from 'react'
import { WhatsComingCard } from './WhatsComingCard'

interface WhatsComingItem {
  tag: string
  title: string
  description: string
  image: string
  background: string
  isBackgroundImage?: boolean
}

interface WhatsComingProps {
  items: WhatsComingItem[]
}

export const WhatsComing: React.FC<WhatsComingProps> = ({ items }) => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium tracking-wider uppercase text-gray-600 mb-2">
          OFFICIAL WYDAD WEBSITE
        </p>
        <h2 className="text-5xl md:text-7xl font-bold text-black">WHAT&apos;S COMING</h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <WhatsComingCard
            key={index}
            tag={item.tag}
            title={item.title}
            description={item.description}
            image={item.image}
            background={item.background}
            isBackgroundImage={item.isBackgroundImage}
          />
        ))}
      </div>
    </section>
  )
}
