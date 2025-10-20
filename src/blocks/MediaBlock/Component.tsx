import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'

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

export const MediaBlock: React.FC<Props> = (props) => {
  const { className, imgClassName, media, logo, title, description, link, staticImage } = props

  return (
    <div className={cn('relative')}>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center gap-6 px-8">
        {logo && <Media resource={logo} imgClassName="w-auto h-40" />}
        {title && <h2 className="text-6xl font-semibold text-white">{title}</h2>}
        {description && <p className="text-lg text-white max-w-2xl">{description}</p>}
        {link?.url && link?.label && (
          <Link
            href={link.url}
            className="bg-primary-red text-white rounded-[10px] py-3 px-8 text-md font-semibold capitalize hover:bg-primary-red/90 transition-colors"
          >
            {link.label}
          </Link>
        )}
      </div>
      {(media || staticImage) && (
        <Media imgClassName={cn(' w-full', imgClassName)} resource={media} src={staticImage} />
      )}
    </div>
  )
}
