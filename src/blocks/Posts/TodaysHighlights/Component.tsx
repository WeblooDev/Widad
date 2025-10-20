'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Post, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface TodaysHighlightsProps {
  posts: Post[]
}

export const TodaysHighlights: React.FC<TodaysHighlightsProps> = ({ posts }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `Aug ${day}, ${year}`
  }

  const selectedPost = posts[selectedIndex]
  const selectedImage = (selectedPost?.heroImage || selectedPost?.meta?.image) as MediaType

  if (!posts || posts.length === 0) return null

  return (
    <div className="">
      <div className="container">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-8 md:mb-12">
          Today&apos;s Highlight
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:items-stretch">
          {/* Left Side - Selected Post Preview */}
          <Link href={`/posts/${selectedPost.slug}`} className="block group h-full">
            <div className="flex flex-col h-full">
              {/* Image */}
              <div className="relative w-full flex-1 rounded-[20px] overflow-hidden aspect-square md:aspect-video lg:aspect-auto">
                {selectedImage?.url && (
                  <Image
                    src={selectedImage.url}
                    alt={selectedPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Content */}
              <div className="space-y-3 mt-4 md:mt-6">
                {/* Date */}
                {selectedPost.publishedAt && (
                  <p className="text-black/60 text-sm md:text-base">
                    {formatDate(selectedPost.publishedAt)}
                  </p>
                )}

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black group-hover:text-primary-red transition-colors">
                  {selectedPost.title}
                </h3>

                {/* Description */}
                {selectedPost.meta?.description && (
                  <p className="text-black/80 text-base md:text-lg line-clamp-3">
                    {selectedPost.meta.description}
                  </p>
                )}
              </div>
            </div>
          </Link>

          {/* Right Side - Posts List */}
          <div className="flex flex-col gap-4 h-full">
            {posts.map((post, index) => {
              const postImage = (post.heroImage || post.meta?.image) as MediaType
              const isSelected = index === selectedIndex

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'flex gap-4 p-2 rounded-[10px] border transition-all duration-300 group',
                    isSelected
                      ? 'bg-primary-red border-primary-red'
                      : 'bg-white border-black/20 hover:bg-primary-red hover:border-primary-red',
                  )}
                >
                  {/* Image */}
                  <div className="relative w-32 md:w-40 lg:w-48 aspect-[4/3] rounded-[8px] overflow-hidden flex-shrink-0">
                    {postImage?.url && (
                      <Image src={postImage.url} alt={post.title} fill className="object-cover" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center flex-1 min-w-0 py-2">
                    {/* Date */}
                    {post.publishedAt && (
                      <p
                        className={cn(
                          'text-xs md:text-sm mb-2 transition-colors',
                          isSelected ? 'text-white/90' : 'text-black/60 group-hover:text-white/90',
                        )}
                      >
                        {formatDate(post.publishedAt)}
                      </p>
                    )}

                    {/* Title */}
                    <h4
                      className={cn(
                        'text-base md:text-lg lg:text-xl font-semibold mb-2 line-clamp-2 transition-colors',
                        isSelected ? 'text-white' : 'text-black group-hover:text-white',
                      )}
                    >
                      {post.title}
                    </h4>

                    {/* Description */}
                    {post.meta?.description && (
                      <p
                        className={cn(
                          'text-xs md:text-sm line-clamp-2 transition-colors',
                          isSelected ? 'text-white/90' : 'text-black/80 group-hover:text-white/90',
                        )}
                      >
                        {post.meta.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
