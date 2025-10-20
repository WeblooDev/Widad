'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { Product } from '../CollectionArchive/CardsCarousel'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

export const ProductCard: React.FC<Product> = (props) => {
  const { title, price, url, images } = props

  return (
    <Link
      className={cn(
        'rounded-[10px] overflow-hidden bg-card hover:cursor-pointer flex flex-col aspect-[1/1.5] group',
      )}
      href={url}
    >
      <div className="relative w-full h-auto flex-1">
        {images && (
          <Image
            src={images[0].url}
            alt={title}
            fill
            className="object-cover w-full h-auto bg-center opacity-100 group-hover:opacity-0 transition-all duration-600"
          />
        )}
        {images && (
          <Image
            src={images[1].url}
            alt={title}
            fill
            className="object-cover w-full h-auto bg-center opacity-0 group-hover:opacity-100 transition-all duration-600"
          />
        )}
      </div>
      <div className="p-4 flex flex-col bg-white text-black justify-center text-center group-hover:bg-black group-hover:text-white transition-colors duration-600 gap-y-3">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-md font-bold">{price} DH</p>

        <p className="text-sm flex justify-center items-center">
          Shop Now <ChevronRightIcon />
        </p>
      </div>
    </Link>
  )
}
