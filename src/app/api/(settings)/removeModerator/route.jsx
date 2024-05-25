'use server'

import dbConnect from '@/app/util/DBConnect';
import User from '@/app/models/User'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();
  
  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error at connecting database at addModerator' }, { status: 500 })
  }

  let channelOwner = await User.findById(receivedData.channelOwnerId).populate('moderators')
  if (!channelOwner) {
    return NextResponse.json({ message: 'Error finding current user from removeModerator' }, { status: 502 })
  }

  let tempArray = channelOwner.moderators
  let filteredArray = []
  tempArray.forEach((moderator) => {
    if (moderator._id != receivedData.moderatorId) {
      filteredArray.push(moderator)
    }
  })
  
  channelOwner.moderators = filteredArray

  try {
    await channelOwner.save()
  } catch (error) {
    return NextResponse.json({ message: 'error saving removeModerator' }, { status: 504 })
  }
  
  return NextResponse.json(channelOwner, { status: 200 })
}