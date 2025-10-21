import { CardsCarousel } from '@/components/CollectionArchive/CardsCarousel'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { getLocalizedField } from '@/utilities/getLocalizedField'
import type { TypedLocale } from 'payload'

const productsData = [
  {
    title: 'WYDAD AC HOME MEN’S JERSEY',
    price: 499.99,
    url: '/',
    images: [
      {
        url: '/images/products/product-1.webp',
      },
      {
        url: '/images/products/product-1-b.webp',
      },
    ],
  },
  {
    title: 'WYDAD AC AWAY MEN’S JERSEY',
    price: 499.99,
    url: '/',
    images: [
      {
        url: '/images/products/product-2.webp',
      },
      {
        url: '/images/products/product-2-b.webp',
      },
    ],
  },
  {
    title: 'WYDAD AC BLUE MEN’S JERSEY',
    price: 499.99,
    url: '/',
    images: [
      {
        url: '/images/products/product-3.webp',
      },
      {
        url: '/images/products/product-3-b.webp',
      },
    ],
  },
  {
    title: 'WYDAD AC BLUE MEN’S JERSEY',
    price: 499.99,
    url: '/',
    images: [
      {
        url: '/images/products/product-4.webp',
      },
      {
        url: '/images/products/product-4-b.webp',
      },
    ],
  },
]

export const StoreBlock = ({
  title,
  locale,
}: {
  title: string | Record<string, string>
  locale: TypedLocale
}) => {
  const localizedTitle = getLocalizedField(title, locale)

  return (
    <div className="store-bg flex flex-col gap-8 p-8 lg:p-24 pe-8 lg:pe-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-y-4 pe-24">
        <h2 className="text-5xl lg:text-6xl font-semibold text-white">{localizedTitle}</h2>

        <Link
          href="/"
          className="flex justify-center items-center text-white text-sm font-bold uppercase"
        >
          Shop the Full Collection <ChevronRightIcon size={20} />
        </Link>
      </div>

      <div className="">
        <CardsCarousel products={productsData} />
      </div>
    </div>
  )
}
