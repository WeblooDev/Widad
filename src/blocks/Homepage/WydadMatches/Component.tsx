'use client'

import type { WydadMatches as WydadMatchesBlock } from '@/payload-types'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { MatchCard } from '@/components/MatchCard'
import { motion } from 'framer-motion'

export const WydadMatches: React.FC<WydadMatchesBlock> = ({ title, link }) => {
  return (
    <div className="wydad-matches-bg py-20">
      <div className="flex flex-col gap-8 w-full container">
        <div className="flex flex-row justify-between items-end">
          <motion.h2
            className="text-6xl font-semibold text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
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
              {link.label} <ChevronRightIcon size={20} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-3 gap-4"
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
              key={index}
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
      </div>
    </div>
  )
}

export const matches = [
  {
    id: '1',
    botola: 'cup',
    matchday: 8,
    team1: 'wydad',
    team1Image: '/wydad-logo.svg',
    team2: 'asante kotoko',
    team2Image: '/images/homepage/icons/asante.svg',
    ongoing: true,
    team1Score: 4,
    team2Score: 0,
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
