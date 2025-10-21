'use client'
import type {
  HistoricalMoments as HistoricalMomentsType,
  Media as MediaType,
} from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

export const HistoricalMoments: React.FC<HistoricalMomentsType & { locale: TypedLocale }> = ({
  backgroundImage,
  title,
  description,
  columns,
  locale,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const bgImage = backgroundImage as MediaType

  if (!columns || columns.length === 0) return null

  return (
    <div className="relative py-0 lg:py-20 overflow-hidden">
      {/* Background Image */}
      {bgImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage.url}
            alt={getLocalizedField(title, locale) || ''}
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="container relative z-10 py-10 lg:py-0">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
            <h2 className="text-5xl lg:text-6xl font-semibold mb-4 lg:w-[40%]">
              {getLocalizedField(title, locale) || ''}
            </h2>
            {description && (
              <p className="text-lg text-white/80 max-w-2xl">
                {getLocalizedField(description, locale) || ''}
              </p>
            )}
          </div>
        </div>

        {/* Columns Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {columns.map((column, index) => {
            const columnBg = column.backgroundImage as MediaType
            const isHovered = hoveredIndex === index
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

            return (
              <div
                key={index}
                className="relative h-[500px] transition-all duration-500 ease-in-out overflow-hidden rounded-[20px] max-lg:!flex-none lg:flex-1"
                style={{
                  flex: isHovered ? '2' : '1',
                  opacity: isOtherHovered ? 0.7 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Column Background Image */}
                {columnBg?.url && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={columnBg.url}
                      alt={getLocalizedField(column.title, locale) || ''}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                )}

                {/* Content Container with Glass Effect */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300"
                  style={{
                    background: isHovered
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    backdropFilter: isHovered ? 'blur(10px)' : 'none',
                    WebkitBackdropFilter: isHovered ? 'blur(10px)' : 'none',
                    margin: isHovered ? '20px' : '0',
                    borderRadius: isHovered ? '10px' : '0',
                  }}
                >
                  {/* Year Pill */}
                  <div className="inline-flex items-center justify-center px-3 py-1 bg-primary-red rounded-full mb-3">
                    <span className="text-white text-xs font-semibold">{column.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {getLocalizedField(column.title, locale) || ''}
                  </h3>
                  {/* Description - Only visible on hover */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: isHovered ? '200px' : '0',
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <p className="text-white/90 text-sm leading-relaxed">
                      {getLocalizedField(column.description, locale) || ''}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
