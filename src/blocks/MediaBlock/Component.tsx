import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props & { locale: TypedLocale }> = (props) => {
  const { className, imgClassName, media, logo, title, description, link, staticImage, locale } = props
  
  const localizedTitle = getLocalizedField(title, locale)
  const localizedDescription = getLocalizedField(description, locale)
  const localizedLabel = getLocalizedField(link?.label, locale)

  return (
    <div className={cn('relative h-max')}>
      <div className="py-4 lg:py-0 relative flex flex-col items-center justify-center z-10 text-center gap-6 px-8">
        {logo && <Media resource={logo} imgClassName="w-auto h-40" />}
        {localizedTitle && <h2 className="text-6xl font-semibold text-white">{localizedTitle || ''}</h2>}
        {localizedDescription && <p className="text-lg text-white max-w-2xl">{localizedDescription || ''}</p>}
        {link?.url && localizedLabel && (
          <Link
            href={link.url}
            className="bg-primary-red text-white rounded-[10px] py-3 px-8 text-md font-semibold capitalize hover:bg-primary-red/90 transition-colors"
          >
            {localizedLabel || ''}
          </Link>
        )}
      </div>
      {(media || staticImage) && (
        <Media
          imgClassName={cn('object-cover z-0 w-full', imgClassName)}
          fill
          resource={media}
          src={staticImage}
        />
      )}
    </div>
  )
}
