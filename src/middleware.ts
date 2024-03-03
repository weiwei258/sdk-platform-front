// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// the following code is taken from : https://nextjs.org/docs/advanced-features/middleware#setting-headers
export function middleware(request: NextRequest) {
  return NextResponse.next({
    headers: {
      'x-pathname': request.nextUrl.pathname,
    },
  });
}
