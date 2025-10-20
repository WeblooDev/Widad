import React from 'react'
import { PostsCarousel as PostsCarouselClient } from './Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Category } from '@/payload-types'

interface PostsCarouselBlockType {
  category?: string | Category | null
  limit?: number | null
  blockType?: 'postsCarousel'
}

export const PostsCarousel: React.FC<PostsCarouselBlockType> = async ({ category, limit }) => {
  const payload = await getPayload({ config: configPromise })

  // Get the category ID
  const categoryId = typeof category === 'string' ? category : category?.id

  if (!categoryId) {
    return null
  }

  // Fetch posts with the specified category
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      categories: {
        contains: categoryId,
      },
      _status: {
        equals: 'published',
      },
    },
    limit: limit || 5,
    sort: '-publishedAt',
    depth: 1,
  })

  if (!posts || posts.length === 0) {
    return null
  }

  return <PostsCarouselClient posts={posts} />
}
