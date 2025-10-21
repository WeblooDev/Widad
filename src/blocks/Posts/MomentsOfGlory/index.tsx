import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import { MomentsOfGlory as MomentsOfGloryComponent } from './Component'

interface MomentsOfGloryBlockProps {
  title?: string
  description?: string
  tag?: string | null
  limit?: number | null
  blockType?: 'momentsOfGlory'
  locale: TypedLocale
}

export const MomentsOfGlory: React.FC<MomentsOfGloryBlockProps> = async ({
  title,
  description,
  tag,
  limit,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  if (!tag) {
    return null
  }

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit || 6,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
      tags: {
        contains: tag,
      },
    },
  })

  if (!fetchedPosts.docs || fetchedPosts.docs.length === 0) {
    return null
  }

  return (
    <MomentsOfGloryComponent
      title={title}
      description={description}
      posts={fetchedPosts.docs}
      locale={locale}
    />
  )
}
