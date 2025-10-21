'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { CardPostData } from '../Card'
import { Card } from '../Card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { cn } from '@/utilities/ui'
import { ProductCard } from '../Card/ProductCard'

export interface Product {
  title: string
  price: number
  url: string
  images: {
    url: string
  }[]
}

export const CardsCarousel = ({
  posts,
  products,
}: {
  posts?: CardPostData[]
  products?: Product[]
}) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <div className="relative">
      <button
        ref={prevRef}
        className={cn(
          'absolute left-2 lg:left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-lg',
          isBeginning && 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        ref={nextRef}
        className={cn(
          'absolute right-2 lg:right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-lg',
          isEnd && 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3.5}
        spaceBetween={20}
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
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3.5,
          },
          1280: {
            slidesPerView: 3.5,
          },
          1536: {
            slidesPerView: 3.5,
          },
        }}
      >
        {posts &&
          posts.map((post, index) => (
            <SwiperSlide key={index}>
              <Card doc={post} />
            </SwiperSlide>
          ))}

        {products &&
          products.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
