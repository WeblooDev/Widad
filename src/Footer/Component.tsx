import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { TypedLocale } from 'payload'
import { LogoFooter } from '@/components/Logo/LogoFooter'
import Image from 'next/image'
import { getLocalizedField } from '@/utilities/getLocalizedField'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()

  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-8 gap-8 flex flex-col items-center ">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-y-8 w-full mt-8">
          <Link className="flex items-center" href="/">
            <LogoFooter />
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-start md:flex-row gap-x-16 md:gap-x-10 lg:gap-x-24 gap-y-6 md:items-start">
            <nav className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-white font-bold">{getLocalizedField(footerData?.football?.title, locale)}</h2>
              {footerData?.football?.links?.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
            <nav className="flex flex-col gap-4 row-span-2 text-center md:text-left">
              <h2 className="text-white font-bold">{getLocalizedField(footerData?.info?.title, locale)}</h2>
              {footerData?.info?.links?.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
            <nav className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-white font-bold">{getLocalizedField(footerData?.help?.title, locale)}</h2>
              {footerData?.help?.links?.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
            <nav className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-white font-bold">{getLocalizedField(footerData?.other?.title, locale)}</h2>
              {footerData?.other?.links?.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
            <nav className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-white font-bold">{getLocalizedField(footerData?.contactInfo?.title, locale)}</h2>
              {footerData?.contactInfo?.links?.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start gap-8 mt-8">
            <nav className="flex flex-row md:flex-col gap-4">
              {footerData?.appLinks?.links?.map((link, i) => {
                const iconUrl =
                  typeof link.icon === 'string' ? link.icon : (link.icon as Media)?.url || ''
                return (
                  <Link key={i} href={link.url}>
                    <Image src={iconUrl} alt="" width={165} height={50} />
                  </Link>
                )
              })}
            </nav>

            <nav className="flex flex-row gap-6">
              {footerData?.socialLinks?.links?.map((link, i) => {
                const iconUrl =
                  typeof link.icon === 'string' ? link.icon : (link.icon as Media)?.url || ''
                return (
                  <Link key={i} href={link.url}>
                    <Image src={iconUrl} alt="" className="w-auto h-8" width={30} height={30} />
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Image src="/images/slogan.svg" alt="Footer Logo" width={1330} height={364} />
        </div>
      </div>
    </footer>
  )
}
