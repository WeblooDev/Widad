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

  const validLocales = ['en', 'fr', 'ar']
  const pathLocale = pathname.split('/')[1]

  if (pathname === '/coming-soon') {
    const url = request.nextUrl.clone()
    url.pathname = '/ar/coming-soon'
    return NextResponse.redirect(url)
  }

  if (validLocales.includes(pathLocale)) {
    return intlMiddleware(request)
  }

  const url = request.nextUrl.clone()
  url.pathname = '/ar/coming-soon'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/', '/coming-soon', '/(en|fr|ar)/:path*'],
}
