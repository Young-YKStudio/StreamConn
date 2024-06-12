import dbConnect from '@/app/util/DBConnect'
import User from '@/app/models/User'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { userNickname } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 503}
    )
  }

  let foundUser 

  try {
    foundUser = await User.findOne({nickname: userNickname})
  } catch (err) {
    return NextResponse.json(
      {message: 'Error found at finding User, Please try again.'},
      {status: 503}
    )
  }

  if(!foundUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 204}
    )
  }

  return NextResponse.json(foundUser, {status: 200})
}