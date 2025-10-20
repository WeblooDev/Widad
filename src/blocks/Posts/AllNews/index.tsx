import type { AllNewsBlock as AllNewsBlockProps, Category, Post } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { AllNews as AllNewsComponent } from './Component'

export const AllNews: React.FC<AllNewsBlockProps> = async (props) => {
  const { categories: selectedCategories, limit = 50 } = props

  const payload = await getPayload({ config: configPromise })

  const categories: Category[] = []
  if (selectedCategories && selectedCategories.length > 0) {
    for (const cat of selectedCategories) {
      if (typeof cat === 'object') {
        categories.push(cat)
      } else {
        const fetchedCat = await payload.findByID({
          collection: 'categories',
          id: cat,
        })
        if (fetchedCat) {
          categories.push(fetchedCat)
        }
      }
    }
  }

  const categoryIds = categories.map((cat) => cat.id)

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit ? limit : 3,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
      ...(categoryIds.length > 0
        ? {
            categories: {
              in: categoryIds,
            },
          }
        : {}),
    },
  })

  return (
    <AllNewsComponent
      posts={fetchedPosts.docs}
      categories={categories}
      postsPerPage={props.postsPerPage || 6}
    />
  )
}
