import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/OG-image.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

interface GenerateMetaArgs {
  doc: Partial<Page> | Partial<Post> | null
  locale?: string
  path?: string
}

export const generateMeta = async (args: GenerateMetaArgs): Promise<Metadata> => {
  const { doc, locale = 'en', path } = args

  let metaImage: Media | Config['db']['defaultIDType'] | null | undefined = undefined
  let metaTitle: string | null | undefined = undefined
  let metaDescription: string | null | undefined = undefined
  let slug: string | undefined = undefined

  // Handle Page and Post types
  if (doc && 'meta' in doc) {
    metaImage = doc.meta?.image
    metaTitle = doc.meta?.title
    metaDescription = doc.meta?.description

    // Handle slug safely
    if (doc.slug) {
      if (typeof doc.slug === 'string') {
        slug = doc.slug
      } else if (doc.slug && typeof doc.slug === 'object') {
        // Handle array-like objects safely
        try {
          const slugArray = Array.from(doc.slug as any)
          slug = slugArray.filter(Boolean).join('/')
        } catch (e) {
          // If conversion fails, use string representation or undefined
          slug = String(doc.slug) || undefined
        }
      }
    }
  }

  const title = metaTitle ? `${metaTitle} | Wydad Athletic Club` : 'Wydad Athletic Club'

  const serverUrl = getServerSideURL()

  const canonicalPath = path ? path : slug ? (slug === 'home' ? '' : `/${slug}`) : ''

  const localePath = locale !== 'en' ? `/${locale}` : ''
  const canonicalUrl = `${serverUrl}${localePath}${canonicalPath}`

  return {
    description: metaDescription,
    openGraph: mergeOpenGraph({
      description: metaDescription || '',
      title,
      url: canonicalPath,
    }),
    title,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
