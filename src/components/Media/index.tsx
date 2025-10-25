import React, { Fragment } from 'react'
import type { Props } from './types'
import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className = '', htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: `relative flex items-center justify-center overflow-hidden ${className}`,
          }
        : {})}
    >
      {isVideo ? (
        <VideoMedia
          videoClassName="object-cover object-center max-w-none absolute inset-0 w-full h-full"
          {...props}
        />
      ) : (
        <ImageMedia {...props} />
      )}
    </Tag>
  )
}
