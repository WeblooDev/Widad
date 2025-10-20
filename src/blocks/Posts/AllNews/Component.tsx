'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { cn } from '@/utilities/ui'
import type { Post, Media as MediaType, Category } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface AllNewsProps {
  posts: Post[]
  categories: Category[]
  postsPerPage?: number
}

export const AllNews: React.FC<AllNewsProps> = ({ posts, categories, postsPerPage = 6 }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return posts
    }
    return posts.filter((post) => {
      if (!post.categories) return false
      return post.categories.some((cat) => {
        const category = typeof cat === 'object' ? cat : null
        return category?.title === selectedCategory
      })
    })
  }, [posts, selectedCategory])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="bg-[#F5F5F5]">
      <div className="container py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-semibold mb-8">All News</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-4 bg-white p-2 w-fit rounded-[10px]">
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              'px-3 py-2 rounded-[10px] font-medium transition-colors text-xs',
              selectedCategory === 'All'
                ? 'bg-primary-red text-white'
                : 'border border-black/30 text-black hover:border-black/50',
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.title)}
              className={cn(
                'px-3 py-2 rounded-[10px] font-medium transition-colors text-xs',
                selectedCategory === category.title
                  ? 'bg-primary-red text-white'
                  : 'border border-black/10 text-black hover:border-black/50',
              )}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {currentPosts.map((post) => {
              const heroImage = post.heroImage as MediaType
              const metaImage = post.meta?.image as MediaType
              const imageUrl = heroImage?.url || metaImage?.url

              // Get the first category
              const postCategory = post.categories?.[0]
              const categoryTitle =
                typeof postCategory === 'object' ? postCategory.title : undefined

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="group block rounded-[10px] overflow-hidden bg-white border border-[#F5F5F5] p-2"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/2.5] rounded-[10px] overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-all"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    {/* Category Badge */}
                    {categoryTitle && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-2 bg-white/90 backdrop-blur-sm text-black text-xs font-medium rounded-full">
                          {categoryTitle}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white">
                    {/* Date */}
                    {post.publishedAt && (
                      <p className="text-black/60 text-sm mb-3">{formatDate(post.publishedAt)}</p>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary-red transition-colors">
                      {post.title}
                    </h3>

                    {/* Description */}
                    {post.meta?.description && (
                      <p className="text-black/70 text-sm line-clamp-2">{post.meta.description}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-black/60">No posts found in this category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 bg-white w-fit rounded-[10px] mx-auto p-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={cn(
                'w-10 h-10 rounded-[7px] flex items-center justify-center transition-colors bg-[#F5F5F5]',
                currentPage === 1
                  ? 'text-black/30 cursor-not-allowed'
                  : 'text-black hover:bg-gray-100',
              )}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-black/60 bg-[#F5F5F5]">
                    ...
                  </span>
                )
              }

              const page = pageNum as number
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'min-w-[40px] h-10 px-3 rounded-[7px] font-medium transition-colors bg-[#F5F5F5]',
                    currentPage === page
                      ? 'bg-primary-red text-white'
                      : 'text-black hover:bg-gray-100',
                  )}
                >
                  {page}
                </button>
              )
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                'w-10 h-10 rounded-[7px] flex items-center justify-center transition-colors bg-[#F5F5F5]',
                currentPage === totalPages
                  ? 'text-black/30 cursor-not-allowed'
                  : 'text-black hover:bg-gray-100',
              )}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
