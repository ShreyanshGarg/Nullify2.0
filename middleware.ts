import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import * as jose from 'jose'

interface DecodedToken {
  user_id: number;
}

const publicApiRoutes = [
  '/api/login',
  '/api/register',
  '/api/forgot-password',
  '/api/reset-password-request',
  '/api/verifyEmail'
]

const publicPages = [
  '/auth',
  '/signup',
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/verify-email',
  '/reset-password'
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isPublicPage = publicPages.includes(pathname)
  const isPublicApiRoute = publicApiRoutes.includes(pathname)
  
  if (isPublicPage || isPublicApiRoute) {
    return NextResponse.next()
  }

  try {

    let token: string | undefined

    if (pathname.startsWith('/api')) {

      const authHeader = request.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse(
          JSON.stringify({ error: 'Missing or invalid authorization header' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      token = authHeader.split(' ')[1]
    } else {
      token = request.cookies.get('authToken')?.value
      if (!token) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return new NextResponse(
        JSON.stringify({ error: 'JWT secret is not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const secretKey = new TextEncoder().encode(jwtSecret)

    const { payload } = await jose.jwtVerify(token, secretKey)
    const decoded = payload as unknown as DecodedToken

    if (!decoded || !decoded.user_id) {
      if (pathname.startsWith('/api')) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid token structure' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      } else {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    if (pathname.startsWith('/api')) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('user', JSON.stringify(decoded))
      return NextResponse.next({
        headers: requestHeaders
      })
    }

    return NextResponse.next()

  } catch (error) {
    console.error('Token verification failed:', error)
    
    if (pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or expired token' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: [
    // Match all pages except public ones
    '/((?!login|register|forgot-password|verify-email|reset-password|_next|favicon.ico).*)',
    // Match all API routes
    '/api/:path*'
  ]
}