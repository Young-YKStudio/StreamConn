import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  // let user = req.nextUrl.pathname.substr(-24)

  console.log(req.nextUrl.pathname)

  return NextResponse.json(
    { message: 'reached route'},
    { status: 200 }
  )
}