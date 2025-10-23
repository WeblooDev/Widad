import React from 'react'

import type { Page } from '@/payload-types'
import type { TypedLocale } from 'payload'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { HomeHero } from '@/heros/HomeHero'
import { ContentHero } from '@/heros/ContentHero'
import { TicketsHero } from '@/heros/TicketsHero'
import { ComingSoonHero } from '@/heros/ComingSoonHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  home: HomeHero,
  contentHero: ContentHero,
  ticketsHero: TicketsHero,
  comingSoon: ComingSoonHero,
}

export const RenderHero: React.FC<Page['hero'] & { locale?: TypedLocale }> = (props) => {
  const { type, locale = 'en' } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} locale={locale} />
}
