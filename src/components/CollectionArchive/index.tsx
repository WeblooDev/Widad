import React from 'react'
import Image from 'next/image'
import { CardPostData } from '@/components/Card'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import { CardsCarousel } from './CardsCarousel'
import { Media } from '@/payload-types'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-1 lg:gap-y-8 lg:gap-x-3 xl:gap-x-3">
        <div className="col-span-4 lg:col-span-12 grid grid-cols-2 lg:grid-cols-2 rounded-[10px] overflow-hidden">
          <Image
            src={(posts[0].meta?.image as Media)?.url || ''}
            alt="hero"
            width={1000}
            height={1000}
            className="aspect-[4/3] w-full h-full object-cover"
          />

          <div className="flex flex-col justify-center items-start gap-4 p-8 bg-black text-white">
            <h2 className="text-2xl font-semibold">{posts[0].title}</h2>
            <p>{posts[0].meta?.description}</p>
            <Link href={posts[0].slug} className="flex items-center gap-2">
              Read more <ChevronRightIcon />
            </Link>
          </div>
        </div>

        <div className="col-span-12">
          <CardsCarousel posts={posts.slice(1)} />
        </div>
      </div>
    </div>
  )
}
