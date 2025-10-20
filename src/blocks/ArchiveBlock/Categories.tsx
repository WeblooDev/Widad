'use client'

import { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

export const Categories = ({ categories }: { categories: Category[] }) => {
  const [currentCategory, setCurrentCategory] = React.useState<string | null>('Press releases')
  return (
    <div className="flex flex-row gap-4 items-center">
      {categories.map((category) => (
        <div
          key={category.title}
          className={cn('text-black px-4 py-3 rounded-[10px] font-medium w-max cursor-pointer', {
            'bg-primary-red text-white': category.title === currentCategory,
            'border border-black/30': category.title !== currentCategory,
          })}
          onClick={() => setCurrentCategory(category.title)}
        >
          <h2>{category.title}</h2>
        </div>
      ))}
    </div>
  )
}
