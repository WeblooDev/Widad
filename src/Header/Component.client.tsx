'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link } from '@/i18n/routing'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import type { Locale } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20 bg-black">
      <div className="py-4 flex justify-between container">
        <div className="flex flex-row gap-8 justify-between items-center">
          <button>
            <Image src="/icons/hamburger.svg" alt="hamburger" width={23} height={15} />
          </button>
          <Link href="/" className="flex flex-row items-center gap-2 w-full min-w-max">
            <Logo loading="eager" priority="high" />
            <p className="text-md font-semibold text-white">Wydad Athletic Club</p>
          </Link>
        </div>

        <HeaderNav data={data} />

        <div className="flex gap-3 items-center">
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 text-primary text-white" />
          </Link>

          <LocaleSwitcher />
        </div>
      </div>
    </header>
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
