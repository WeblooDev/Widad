'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Post, Media as MediaType } from '@/payload-types'

interface PostsCarouselProps {
  posts: Post[]
}

export const PostsCarousel: React.FC<PostsCarouselProps> = ({ posts }) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <div className="relative lg:container lg:p-8">
      {/* Navigation Arrows */}
      <button
        ref={prevRef}
        className={cn(
          'absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-lg',
          isBeginning && 'opacity-0 pointer-events-none',
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
      </button>
      <button
        ref={nextRef}
        className={cn(
          'absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-lg',
          isEnd && 'opacity-0 pointer-events-none',
        )}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            const navigation = swiper.params.navigation
            if (navigation) {
              navigation.prevEl = prevRef.current
              navigation.nextEl = nextRef.current
            }
          }
        }}
        onSlideChange={handleSlideChange}
        onInit={handleSlideChange}
        className="w-full  lg:rounded-[20px]"
      >
        {posts.map((post) => {
          const heroImage = post.heroImage as MediaType
          const metaImage = post.meta?.image as MediaType
          const imageUrl = heroImage?.url || metaImage?.url

          return (
            <SwiperSlide key={post.id}>
              <Link href={`/posts/${post.slug}`} className="block">
                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[600px] overflow-hidden">
                  {/* Background Image */}
                  {imageUrl && (
                    <Image src={imageUrl} alt={post.title} fill className="object-cover" priority />
                  )}

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-10">
                    <div className="lg:container max-w-7xl">
                      <div className="max-w-2xl">
                        {/* Date */}
                        {post.publishedAt && (
                          <p className="text-white/80 text-sm md:text-base mb-3 md:mb-4">
                            {formatDate(post.publishedAt)}
                          </p>
                        )}

                        {/* Title */}
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 md:mb-4 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Description */}
                        {post.meta?.description && (
                          <p className="text-white/90 text-base md:text-lg lg:text-xl line-clamp-2 md:line-clamp-3">
                            {post.meta.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
