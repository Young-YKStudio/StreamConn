import dbConnect from "@/app/util/DBConnect";
import User from '@/app/models/User'
import Channel from "@/app/models/Channels";
import { NextResponse } from "next/server";

export async function POST(req) {
  const receivedData = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json({ message: 'error at connecting to database' }, { status: 500 })
  }

  let foundChannel = await Channel.findById(receivedData.channelId)
  
  if (!foundChannel) {
    return NextResponse.json({ message: 'Channel not found' }, { status: 502 })
  }

  foundChannel.isPrivate = receivedData.private

  try {
    await foundChannel.save()
  } catch (error) {
    return NextResponse.json({ message: 'Error saving channel privacy' }, { status: 504 })
  }

  let foundChannelOwner = await User.findById(receivedData.channelOwner).populate('channels')

  if (!foundChannelOwner) {
    return NextResponse.json({ message: 'Channel owner not found' }, { status: 502 })
  }

  return NextResponse.json(foundChannelOwner, {status: 200})
}