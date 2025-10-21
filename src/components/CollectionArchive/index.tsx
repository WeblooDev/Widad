'use client'

import React from 'react'
import Image from 'next/image'
import { CardPostData } from '@/components/Card'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import { CardsCarousel } from './CardsCarousel'
import { Media } from '@/payload-types'
import { motion } from 'framer-motion'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-1 lg:gap-y-8 lg:gap-x-3 xl:gap-x-3">
        <motion.div
          className="col-span-4 lg:col-span-12 grid grid-cols-2 lg:grid-cols-2 rounded-[10px] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
        >
          <div className="overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src={(posts[0].meta?.image as Media)?.url || ''}
                alt="hero"
                width={1000}
                height={1000}
                className="aspect-[4/3] w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center items-start gap-4 p-8 bg-black text-white rounded-e-[10px] overflow-hidden">
            <motion.h2
              className="text-2xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {posts[0].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {posts[0].meta?.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href={posts[0].slug}
                className="flex items-center gap-2 hover:text-primary-red transition-colors"
              >
                Read more <ChevronRightIcon />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="col-span-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CardsCarousel posts={posts.slice(1)} />
        </motion.div>
      </div>
    </div>
  )
}
