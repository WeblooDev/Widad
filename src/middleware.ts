import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(request)
  }

  const isComingSoonPage = pathname.includes('/coming-soon')

  if (!isComingSoonPage) {
    const locale = pathname.split('/')[1] || 'ar'
    const validLocales = ['en', 'fr', 'ar']
    const targetLocale = validLocales.includes(locale) ? locale : 'ar'

    const url = request.nextUrl.clone()
    url.pathname = `/${targetLocale}/coming-soon`
    return NextResponse.redirect(url)
  }

  return intlMiddleware(request)
}

// see https://next-intl-docs.vercel.app/docs/routing/middleware
export const config = {
  matcher: ['/', '/(en|fr|ar)/:path*'], // Adjust to your supported locales
}
