import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'The Wydad official website is launching soon! Stay tuned for the latest news and exclusive content.',
  images: [
    {
      url: `${getServerSideURL()}/OG-image.jpg`,
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
