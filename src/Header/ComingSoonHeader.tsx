'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link } from '@/i18n/routing'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import type { Locale } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

interface ComingSoonHeaderProps {
  data: Header
}

export const ComingSoonHeader: React.FC<ComingSoonHeaderProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const t = useTranslations()
  const locale = useLocale()
  const isArabic = locale === 'ar'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const currentScrollY = latest

    if (currentScrollY < lastScrollY || currentScrollY < 10) {
      setIsVisible(true)
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false)
    }

    setLastScrollY(currentScrollY)
  })

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-20 bg-black shadow-lg"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className="py-4 flex justify-between container px-4 lg:px-0"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <div className="flex flex-row gap-8 justify-between items-center">
            <Link href="/" className="flex flex-row items-center gap-2 w-full">
              <Logo loading="eager" priority="high" />
              <p className="text-md font-semibold text-white min-w-max">{t('header.title')}</p>
            </Link>
          </div>

          <div className="flex gap-3 items-center" dir={isArabic ? 'ltr' : 'ltr'}>
            <div className="">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </motion.header>
    </>
  )
}

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  function onSelectChange(value: string) {
    startTransition(() => {
      const currentPath = pathname.replace(new RegExp(`^/${locale}`), '')
      const nextLocale = value as Locale
      router.replace(`/${nextLocale}${currentPath}`)
    })
  }

  return (
    <div className="w-max">
      <button
        onClick={() => onSelectChange('fr')}
        className="border-r border-r-white border-r-[1px] py-[1px] px-2"
      >
        <p className="text-white text-sm font-medium">FR</p>
      </button>

      <button
        onClick={() => onSelectChange('ar')}
        className="border-r border-r-white border-r-[1px] py-[1px] px-2"
      >
        <p className="text-white text-sm font-medium">AR</p>
      </button>

      <button onClick={() => onSelectChange('en')} className="py-[1px] px-2">
        <p className="text-white text-sm font-medium">EN</p>
      </button>
    </div>
  )
}
