'use server'

import dbConnect from '@/app/util/DBConnect';
// import Channel from '@/app/models/Channels';
import User from '@/app/models/User'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();
  
  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error at connecting database at addModerator' }, { status: 500 })
  }

  let foundUser = await User.findOne({ nickname: receivedData.moderatorNickname })
  if (!foundUser) {
    return NextResponse.json({message: 'No user found'}, { status: 404 })
  }
  
  let channelOwner = await User.findById(receivedData.channelOwnerId).populate('moderators')
  if (channelOwner) {
    channelOwner.moderators.push(foundUser)
  }

  try {
    await channelOwner.save()
  } catch (error) {
    return NextResponse.json({ message: 'error saving addModerator' }, { status: 504 })
  }
  
  return NextResponse.json(channelOwner, { status: 200 })
}