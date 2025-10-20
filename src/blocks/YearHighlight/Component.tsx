import React from 'react'
import Image from 'next/image'
import type { YearHighlight as YearHighlightType, Media as MediaType } from '@/payload-types'

export const YearHighlight: React.FC<YearHighlightType> = ({
  year,
  title,
  description,
  mainImage,
  trophyImage,
  logoImage,
}) => {
  const mainImg = mainImage as MediaType
  const trophyImg = trophyImage as MediaType
  const logoImg = logoImage as MediaType

  return (
    <div className="bg-white lg:pb-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end">
          {/* Left Side - Images Grid */}
          <div className="grid grid-cols-5 gap-4 col-span-3">
            {/* Large Main Image - Takes full height on left */}
            <div className="relative rounded-[20px] overflow-hidden col-span-3">
              {mainImg?.url && (
                <Image src={mainImg.url} alt={title} fill className="object-cover w-full h-full" />
              )}
            </div>

            {/* Right Column - Trophy and Logo stacked */}
            <div className="flex flex-col gap-4 col-span-2">
              {/* Trophy Image */}
              {trophyImg?.url && (
                <div className="relative w-full rounded-[20px] overflow-hidden aspect-[4/5]">
                  <Image src={trophyImg.url} alt="Trophy" fill className="object-cover" />
                </div>
              )}

              {/* Logo Image */}
              {logoImg?.url && (
                <div className="relative w-full rounded-[20px] overflow-hidden aspect-square">
                  <Image src={logoImg.url} alt="Logo" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-4 col-span-2">
            {/* Year Badge */}
            {year && (
              <div className="inline-block bg-primary-red text-white px-6 py-2 rounded-full text-xs font-medium lg:mb-20">
                {year}
              </div>
            )}

            {/* Title */}
            <h2 className="text-4xl md:text-4xl font-semibold text-black leading-tight">{title}</h2>

            {/* Description */}
            <p className="text-lg text-black/70 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
