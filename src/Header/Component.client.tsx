'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link } from '@/i18n/routing'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MegaMenu } from './MegaMenu'
import type { Locale } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Handle scroll direction
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const currentScrollY = latest
    
    // Show header when scrolling up or at the top
    if (currentScrollY < lastScrollY || currentScrollY < 10) {
      setIsVisible(true)
    } 
    // Hide header when scrolling down (and not at the very top)
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
        <div className="py-4 flex justify-between container">
          <div className="flex flex-row gap-8 justify-between items-center">
            <button onClick={() => setIsMegaMenuOpen(true)}>
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

            <div className="hidden lg:block">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
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
