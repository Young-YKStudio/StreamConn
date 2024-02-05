import { withAuth } from 'next-auth/middleware'
import { NextResponse, NextRequest } from 'next/server'

export default withAuth(
  function middleware(req) {
    console.log('middleware triggered')
    console.log(req.nextUrl.pathname)
    console.log(req.nextauth.token)

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

// export function middleware() {
//   return NextResponse.json({
//     hello: 'middleware'
//   })
// }

// export const config = { matcher: ['/login', '/register']}