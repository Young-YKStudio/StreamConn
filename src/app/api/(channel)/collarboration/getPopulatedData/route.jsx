import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
import Comment from '@/app/models/comment';
import Post from "@/app/models/post";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const {channelId} = await req.json()

  try { 
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  const foundChannel = await Channel.findOne({_id: channelId}).populate({
    path: 'posts', model: Post,
      populate: {
        path: 'comments', model: Comment,
        populate: {
          path: 'userId', model: User
        }
      }  
    // populate: {path: 'comments', model: Comment}
  })

  if(!foundChannel) {
    return NextResponse.json(
      {message: 'Channel not found'},
      {status: 404}
    )
  }
    
  return NextResponse.json(
    foundChannel,
    { status: 200 },
  )
}