import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Stay updated with the latest news and content from Wydad',
  images: [
    {
      url: `${getServerSideURL()}/OG-image.webp`,
    },
  ],
  siteName: 'Wydad Athletic Club',
  title: 'Wydad Athletic Club',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
