import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { StoreBlock } from '@/blocks/Homepage/StoreBlock/config'
import { WydadTV } from '@/blocks/Homepage/WydadTV/config'
import { WydadMatches } from '@/blocks/Homepage/WydadMatches/config'
import { WydadAcademy } from '@/blocks/Homepage/WydadAcademy/config'
import { WydadTrophies } from '@/blocks/Homepage/WydadTrophies/config'
import { TitleWithBackground } from '@/blocks/TitleWithBackground/config'
import { Sponsors } from '@/blocks/Sponsors/config'
import { History } from '@/blocks/History/History/config'
import { HistoricalMoments } from '@/blocks/History/HistoricalMoments/config'
import { Quote } from '@/blocks/Quote/config'
import { CTA as CTABlock } from '@/blocks/CTA/config'
import { PostsCarousel } from '@/blocks/Posts/PostsCarousel/config'
import { TodaysHighlights } from '@/blocks/Posts/TodaysHighlights/config'
import { AllNews } from '@/blocks/Posts/AllNews/config'
import { MomentsOfGlory } from '@/blocks/Posts/MomentsOfGlory/config'
import { YearHighlight } from '@/blocks/YearHighlight/config'
import { AllPlayers } from '@/blocks/AllPlayers/config'
import { FAQ } from '@/blocks/FAQ/config'
import { UpcomingMatches } from '@/blocks/UpcomingMatches/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                StoreBlock,
                WydadTV,
                WydadMatches,
                WydadAcademy,
                WydadTrophies,
                TitleWithBackground,
                Sponsors,
                History,
                HistoricalMoments,
                Quote,
                CTABlock,
                PostsCarousel,
                TodaysHighlights,
                AllNews,
                MomentsOfGlory,
                YearHighlight,
                AllPlayers,
                FAQ,
                UpcomingMatches,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
