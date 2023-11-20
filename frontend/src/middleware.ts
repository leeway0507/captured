
import { NextRequest, NextResponse } from 'next/server'



export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/asd')) {
      const allowedKeywords = new Set(process.env.ALLOWRED_KEYWORDS_IN_CATEGORY!.split(','))
      
      const path = request.nextUrl.pathname.split('/')[2]

      if (!allowedKeywords.has(path)) return  NextResponse.redirect(new URL('/page-not-found', request.url))
    
    
  }
}

export const config = {
  matcher: ['/category/:path*'],
}