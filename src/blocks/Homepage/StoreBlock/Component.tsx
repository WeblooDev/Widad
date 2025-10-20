import { CardsCarousel } from '@/components/CollectionArchive/CardsCarousel'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

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

export const StoreBlock = ({ title }: { title: string }) => {
  return (
    <div className="store-bg flex flex-col gap-8 p-24 pe-0">
      <div className="flex flex-row justify-between items-end pe-24">
        <h2 className="text-6xl font-semibold text-white">{title}</h2>

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
