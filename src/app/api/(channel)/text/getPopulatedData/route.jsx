import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
// import Post from "@/app/models/post";
// import Comment from '@/app/models/comment';
// import User from '@/app/models/User';
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
  
  // const foundChannelData = await Channel.findById(receivedData.channelId).populate({path: 'posts', populate: { path: 'comments' } })
  const foundChannelData = await Channel.findById(receivedData.channelId).populate('posts')

  if(!foundChannelData) {
    return NextResponse.json(
      {message: 'Channel not found'},
      {status: 404}
    )
  }
    
  return NextResponse.json(
    foundChannelData,
    { status: 200 },
  )
}