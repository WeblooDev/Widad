import React from 'react'
import { TodaysHighlights as TodaysHighlightsClient } from './Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface TodaysHighlightsBlockType {
  tag?: 'today' | 'featured' | 'breaking' | 'trending' | null
  limit?: number | null
  blockType?: 'todaysHighlights'
}

export const TodaysHighlights: React.FC<TodaysHighlightsBlockType> = async ({ tag, limit }) => {
  const payload = await getPayload({ config: configPromise })

  if (!tag) {
    return null
  }

  // Fetch posts with the specified tag
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      tags: {
        contains: tag,
      },
      _status: {
        equals: 'published',
      },
    },
    limit: limit || 3,
    sort: '-publishedAt',
    depth: 1,
  })

  if (!posts || posts.length === 0) {
    return null
  }

  return <TodaysHighlightsClient posts={posts} />
}
