
import { NextRequest, NextResponse } from 'next/server'



export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/category/')) {
      const allowedKeywords = new Set(process.env.ALLOWRED_KEYWORDS_IN_CATEGORY!.split(','))
      
      const path = request.nextUrl.pathname.split('/')[2]

      if (path === 'brand') {
        const brand = request.nextUrl.pathname.split('/')[3]

        if (brand === null) return  NextResponse.redirect(
          new URL('/page-not-found', request.url)
        )
      }

      else if (!allowedKeywords.has(path)) return  NextResponse.redirect(new URL('/page-not-found', request.url))
    
    
  }
}

export const config = {
  matcher: ['/category/:path*'],
}