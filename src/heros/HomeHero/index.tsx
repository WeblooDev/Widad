'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const HomeHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-end justify-center text-white min-h-[80vh]">
      <div className="container mb-16 z-10 p-8 lg:p-12 absolute inset-0 flex flex-col justify-end h-full">
        <div className="w-full flex flex-col lg:flex-row justify-between items-end">
          <h1 className="text-5xl lg:text-6xl font-semibold max-w-[25.5rem]">
            Wydad Athletic Club
          </h1>

          <div className="flex flex-col justify-start">
            <p className="text-lg font-semibold pb-2 lg:pb-4 lg:ps-4">Get the WYDAD MOBILE APP</p>
            <div className="flex flex-row gap-4 items-center">
              <Image src="/images/app-store.svg" alt="app-store" width={180} height={53} />
              <Image src="/images/google-play.svg" alt="google-play" width={180} height={53} />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center p-3 border border-white/30 rounded-[10px] absolute top-12 right-12">
          <Image src="/wydad-logo.svg" alt="wydad-logo" width={50} height={50} />
          <p className="text-white text-4xl font-semibold">2 - 1</p>
          <Image src="/images/raja.png" alt="raja-logo" width={50} height={50} />
          <p className="text-white text-md font-semibold uppercase">Live Match</p>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
