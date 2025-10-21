import type { Post, ArchiveBlock as ArchiveBlockProps, Category } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Categories } from './Categories'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      sort: 'createdAt',
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  // Safely render introContent - handle both string and localized object
  const renderIntroContent = () => {
    if (!introContent) return null
    
    // If it's a string, render it directly
    if (typeof introContent === 'string') {
      return <h2 className="ms-0 max-w-[48rem] text-6xl !font-bold">{introContent}</h2>
    }
    
    // If it's an object (localized), try to get a value
    if (typeof introContent === 'object' && introContent !== null) {
      const content = (introContent as any).en || Object.values(introContent)[0]
      return <h2 className="ms-0 max-w-[48rem] text-6xl !font-bold">{content}</h2>
    }
    
    return null
  }

  return (
    <div className="container my-16" id={`block-${id}`}>
      <div className="flex flex-row justify-between items-center mb-16">
        {renderIntroContent()}

        {categories && <Categories categories={categories as Category[]} />}
      </div>

      <CollectionArchive posts={posts} />
    </div>
  )
}
