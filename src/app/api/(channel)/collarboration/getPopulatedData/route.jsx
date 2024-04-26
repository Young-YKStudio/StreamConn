import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
import Comment from '@/app/models/comment';
import Collarboration from "@/app/models/Collarborations";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const receivedData = await req.json()
  
  try { 
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  const foundUser = await User.findOne({nickname: receivedData.data})

  if(!foundUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 404}
    )
  }
  
  const foundChannelData = await Channel.find({channelOwner: foundUser._id}).populate({path: 'channelOwner', model: User}).populate({path: 'collarborations', model: Collarboration})
  
  if(foundChannelData.length == 0) {
    return NextResponse.json(
      {message: 'Channel not found'},
      {status: 404}
    )
  }

  let filteredChannel = foundChannelData.filter((channel) => channel.channelType==='Collaboration')

  let returningData = { 
    channelOwner: foundUser,
    foundChannel: filteredChannel
  }
    
  return NextResponse.json(
    returningData,
    { status: 200 },
  )
}