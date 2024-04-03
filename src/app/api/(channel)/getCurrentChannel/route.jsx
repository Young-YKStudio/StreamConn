import User from '@/app/models/User'
import Channel from '@/app/models/Channels'
import Post from '@/app/models/post'
import Comment from '@/app/models/comment'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const submittedData = await req.json()

  
  const { channel, channelOwner } = submittedData
  
  if(!channel || !channelOwner) {
    return NextResponse.json(
      {message: 'please provide channel and channelOwner'},
      {status: 400}
    )
  }
    
  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }
      
  const foundChannelOwner = await User.findOne({_id: channelOwner}).populate('blockedUsers').populate({path: 'channels', model: Channel})

  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'Channel owner not found'},
      {status: 404}
    )
  }

  const sendingData = {
    channelOwner: foundChannelOwner,
  }
  
  return NextResponse.json(
    sendingData,
    {status: 200}
  )
}