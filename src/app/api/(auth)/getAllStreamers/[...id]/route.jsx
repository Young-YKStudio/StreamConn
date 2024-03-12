import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'

export const POST = async (req) => {

  let userId = req.nextUrl.pathname.substr(-24)

  const data = await req.json()

  let samepleReturn = {
    user: userId,
    data: data
  }
  
  return NextResponse.json(
    {message: samepleReturn},
    {status: 200}
  )
}
