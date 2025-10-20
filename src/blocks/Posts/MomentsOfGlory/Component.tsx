import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Post, Media as MediaType } from '@/payload-types'

interface MomentsOfGloryProps {
  title?: string
  description?: string
  posts: Post[]
}

export const MomentsOfGlory: React.FC<MomentsOfGloryProps> = ({ title, description, posts }) => {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  // Split posts into different sizes for masonry layout
  // First post is large (left), second post is large (right), rest are small
  const largePostLeft = posts[0]
  const largePostRight = posts[1]
  const smallPosts = posts.slice(2, 6) // Get up to 4 small posts

  return (
    <div className="bg-[#F5F5F5] py-16">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 gap-6">
          <h2 className="text-5xl md:text-6xl font-semibold max-w-md">
            {title || 'Moments Of Glory'}
          </h2>
          {description && (
            <p className="text-lg text-black/70 max-w-xl lg:text-right">{description}</p>
          )}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {/* Right Column - Container for large and small posts */}
          <div className="grid grid-cols-1 gap-4 lg:auto-rows-fr lg:col-span-2">
            {/* Large Post Right */}
            {largePostRight && (
              <Link
                href={`/posts/${largePostRight.slug}`}
                className="group relative block rounded-[10px] overflow-hidden aspect-[4/3] lg:aspect-auto"
              >
                <div className="relative w-full h-full">
                  {(() => {
                    const heroImage = largePostRight.heroImage as MediaType
                    const metaImage = largePostRight.meta?.image as MediaType
                    const imageUrl = heroImage?.url || metaImage?.url

                    return imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={largePostRight.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : null
                  })()}

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {largePostRight.publishedAt && (
                      <p className="text-white/90 text-sm mb-2">
                        {formatDate(largePostRight.publishedAt)}
                      </p>
                    )}
                    <h3 className="text-2xl md:text-3xl font-semibold line-clamp-2">
                      {largePostRight.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
            {/* Small Posts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smallPosts.slice(0, 2).map((post) => {
                const heroImage = post.heroImage as MediaType
                const metaImage = post.meta?.image as MediaType
                const imageUrl = heroImage?.url || metaImage?.url

                return (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group relative block rounded-[10px] overflow-hidden min-h-[250px] h-full"
                  >
                    <div className="relative w-full h-full">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 1024px) 50vw, 25vw"
                        />
                      )}

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        {post.publishedAt && (
                          <p className="text-white/90 text-xs mb-1">
                            {formatDate(post.publishedAt)}
                          </p>
                        )}
                        <h3 className="text-base md:text-lg font-semibold line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Small Posts Row */}
            {smallPosts.length > 2 && (
              <div className="grid grid-cols-2 gap-4">
                {smallPosts.slice(2, 4).map((post) => {
                  const heroImage = post.heroImage as MediaType
                  const metaImage = post.meta?.image as MediaType
                  const imageUrl = heroImage?.url || metaImage?.url

                  return (
                    <Link
                      key={post.id}
                      href={`/posts/${post.slug}`}
                      className="group relative block rounded-[10px] overflow-hidden min-h-[250px] h-full"
                    >
                      <div className="relative w-full h-full">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 1024px) 50vw, 25vw"
                          />
                        )}

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          {post.publishedAt && (
                            <p className="text-white/90 text-xs mb-1">
                              {formatDate(post.publishedAt)}
                            </p>
                          )}
                          <h3 className="text-base md:text-lg font-semibold line-clamp-2">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          {/* Left Column - Large Post */}
          {largePostLeft && (
            <Link
              href={`/posts/${largePostLeft.slug}`}
              className="group relative block rounded-[10px] overflow-hidden aspect-[4/3] lg:aspect-auto"
            >
              <div className="relative w-full h-full lg:min-h-[400px]">
                {(() => {
                  const heroImage = largePostLeft.heroImage as MediaType
                  const metaImage = largePostLeft.meta?.image as MediaType
                  const imageUrl = heroImage?.url || metaImage?.url

                  return imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={largePostLeft.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : null
                })()}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {largePostLeft.publishedAt && (
                    <p className="text-white/90 text-sm mb-2">
                      {formatDate(largePostLeft.publishedAt)}
                    </p>
                  )}
                  <h3 className="text-2xl md:text-3xl font-semibold line-clamp-2">
                    {largePostLeft.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
