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


  let foundAllStreamers

  try {
    foundAllStreamers = await User.find({isStreamer: true})
  } catch (err) {
    return NextResponse.json(
      {message: 'Error found at finding all streamers, Please try again.'},
      {status: 503}
    )
  }

  if(!foundAllStreamers) {
    return NextResponse.json(
      {message: 'Error connecting to database'},
      {status: 503}
    )
  }

  let filteredStreamers = foundAllStreamers.filter((streamer) => streamer.nickname.toLowerCase().includes(userNickname.toLowerCase()))

  return NextResponse.json(filteredStreamers, {status: 200})
}