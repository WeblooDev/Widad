'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Link } from '@/i18n/routing'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const ContentHero: React.FC<Page['hero']> = (props) => {
  const { subtitle, richText, description, links, media, imageLayout } = props as Page['hero'] & {
    subtitle?: string | null
    description?: string | null
    imageLayout?: 'below' | 'background' | null
  }

  const { setHeaderTheme } = useHeaderTheme()
  const isBackground = imageLayout === 'background'

  useEffect(() => {
    setHeaderTheme(isBackground ? 'dark' : 'light')
  }, [isBackground, setHeaderTheme])

  // Background layout
  if (isBackground && media && typeof media === 'object') {
    return (
      <div className={'relative flex items-center bg-white container mt-10'}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Media resource={media} imgClassName="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative z-10 py-20 h-full items-stretch justify-between">
          <div className="grid grid-cols-2 gap-12 h-full">
            {/* Left column: Subtitle and Title */}
            <div className="flex flex-col gap-6">
              {subtitle && (
                <p className="font-normal uppercase tracking-wider text-white text-lg">
                  {subtitle}
                </p>
              )}
              {richText && (
                <div className="text-white [&_h1]:text-5xl [&_h1]:leading-[5xl] [&_h2]:text-5xl [&_h2]:leading-[5xl] [&_p]:text-5xl [&_p]:leading-[5xl]">
                  <RichText data={richText} enableGutter={false} />
                </div>
              )}
            </div>

            {/* Right column: Description and Link */}
            <div className="flex flex-col justify-between items-start">
              {description && <p className="text-lg text-white/90 leading-lg">{description}</p>}

              {links && links.length > 0 && (
                <Link
                  href={links[0].link.url ? links[0].link.url : ''}
                  className="flex justify-center items-center text-white text-sm font-bold uppercase"
                >
                  {links[0].link.label} <ChevronRightIcon size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Below layout (default)
  return (
    <div className="py-20">
      <div className="container">
        {/* Content section */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* Left column: Subtitle and Title */}
          <div className="flex flex-col gap-6">
            {subtitle && (
              <p className="text-primary-red text-4xl font-normal uppercase tracking-wider">
                {subtitle}
              </p>
            )}
            {richText && (
              <div className="text-black [&_h1]:text-5xl [&_h1]:leading-[5xl] [&_h2]:text-5xl [&_h2]:leading-[5xl] [&_p]:text-5xl [&_p]:leading-[5xl]">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
          </div>

          {/* Right column: Description and Link */}
          <div className="flex flex-col justify-between items-start">
            {description && <p className="text-lg text-gray-700 leading-lg">{description}</p>}

            {links && links.length > 0 && (
              <Link
                href={links[0].link.url ? links[0].link.url : ''}
                className="flex justify-center items-center text-black text-sm font-bold uppercase"
              >
                {links[0].link.label} <ChevronRightIcon size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* Image section - full width */}
        {media && typeof media === 'object' && (
          <div className="w-full rounded-[20px] overflow-hidden max-h-[70vh]">
            <Media resource={media} imgClassName="w-full h-auto object-cover" />
          </div>
        )}
      </div>
    </div>
  )
}
