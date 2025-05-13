import dbConnect from "@/app/util/DBConnect";
import User from '@/app/models/User'
import Channel from '@/app/models/Channels'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const receivedData = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json({ message: 'error at connecting to database' }, { status: 500 })
  }

  let foundChannel = await Channel.findById(receivedData.channelId)
  // if channelType is text
  // if channelType is participation
  // if channelType is collarbo

  if(!foundChannel) {
    return NextResponse.json({ message: 'Channel not found' }, { status: 502 })
  }
  
  let foundChannelOwner = await User.findById(receivedData.channelOwner)

  if(!foundChannelOwner) {
    return NextResponse.json({ message: 'Channel owner not found' }, { status: 502 })
  }

  console.log(foundChannel, 'from backend')


  // user/channel
  // mod/allowedChannel

  

  return NextResponse.json({status: 200})
}