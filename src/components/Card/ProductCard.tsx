'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useState } from 'react'

import { Product } from '../CollectionArchive/CardsCarousel'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const ProductCard: React.FC<Product> = (props) => {
  const { title, price, url, images } = props
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      className={cn(
        'rounded-[10px] overflow-hidden bg-card hover:cursor-pointer flex flex-col aspect-[1/1.5]',
      )}
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-auto flex-1 overflow-hidden">
        {images && images[0] && (
          <motion.div
            className="absolute inset-0"
            style={{ opacity: isHovered ? 0 : 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Image src={images[0].url} alt={title} fill className="object-cover" />
          </motion.div>
        )}
        {images && images[1] && (
          <motion.div
            className="absolute inset-0"
            style={{ opacity: isHovered ? 1 : 0 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Image src={images[1].url} alt={title} fill className="object-cover" />
          </motion.div>
        )}
      </div>
      <motion.div
        className="p-4 flex flex-col justify-center text-center gap-y-3"
        animate={{
          backgroundColor: isHovered ? '#000000' : '#ffffff',
          color: isHovered ? '#ffffff' : '#000000',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <motion.h3
          className="text-md font-semibold"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-md font-bold"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {price} DH
        </motion.p>

        <motion.p
          className="text-sm flex justify-center items-center gap-1"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Shop Now <ChevronRightIcon className="w-4 h-4" />
        </motion.p>
      </motion.div>
    </Link>
  )
}
