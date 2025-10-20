import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TypedLocale } from 'payload'
import { StoreBlock } from './Homepage/StoreBlock/Component'
import { WydadTV } from './Homepage/WydadTV/Component'
import { WydadMatches } from './Homepage/WydadMatches/Component'
import { WydadAcademy } from './Homepage/WydadAcademy/Component'
import { WydadTrophies } from './Homepage/WydadTrophies/Component'
import { TitleWithBackground } from './TitleWithBackground/Component'
import { Sponsors } from './Sponsors/Component'
import { History } from './History/History/Component'
import { HistoricalMoments } from './History/HistoricalMoments/Component'
import { Quote } from './Quote/Component'
import { CTA as CTABlock } from './CTA/Component'
import { PostsCarousel } from './Posts/PostsCarousel'
import { TodaysHighlights } from './Posts/TodaysHighlights'
import { AllNews } from './Posts/AllNews'
import { MomentsOfGlory } from './Posts/MomentsOfGlory'
import { YearHighlight } from './YearHighlight/Component'
import { AllPlayers } from './AllPlayers/Component'
import { FAQ } from './FAQ/Component'
import { UpcomingMatches } from './UpcomingMatches/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  storeBlock: StoreBlock,
  wydadTV: WydadTV,
  wydadMatches: WydadMatches,
  wydadAcademy: WydadAcademy,
  wydadTrophies: WydadTrophies,
  titleWithBackground: TitleWithBackground,
  sponsors: Sponsors,
  history: History,
  historicalMoments: HistoricalMoments,
  quote: Quote,
  ctaBlock: CTABlock,
  postsCarousel: PostsCarousel,
  todaysHighlights: TodaysHighlights,
  allNews: AllNews,
  momentsOfGlory: MomentsOfGlory,
  yearHighlight: YearHighlight,
  allPlayers: AllPlayers,
  faq: FAQ,
  upcomingMatches: UpcomingMatches,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: TypedLocale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Handle different margin classes for different block types
              let marginClass = 'my-16'
              if (blockType === 'sponsors') {
                marginClass = 'mb-16'
              } else if (blockType === 'postsCarousel') {
                marginClass = '' // Full width, no margin
              }

              return (
                <div className={marginClass} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
