import { withAuth } from 'next-auth/middleware'
import { NextResponse, NextRequest } from 'next/server'

export default withAuth(
  function middleware(req) {

    if(req.nextUrl.pathname.startsWith('/account') && !req.nextauth.token) {
      return NextResponse.rewrite(`${process.env.APP_URL}/login`, req.url)
    }
    if(req.nextUrl.pathname.startsWith('/login') && req.nextauth.token.email) {
      return NextResponse.rewrite(`${process.env.APP_URL}`, req.url)
    }
    if(req.nextUrl.pathname.startsWith('/register') && req.nextauth.token.email) {
      return NextResponse.rewrite(`${process.env.APP_URL}`, req.url)
    }
    // if(req.nextUrl.pathname.startsWith('/CreateUser') && req.nextauth.token.role != 'admin') {
    //   return NextResponse.rewrite(new URL('/Denied', req.url))
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = { matcher: []}