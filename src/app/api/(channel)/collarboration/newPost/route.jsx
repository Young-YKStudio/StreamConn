import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
import Post from "@/app/models/post";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const submittedData = await req.json()

  const { AuthProvider, channelOwnerId, channel, body } = submittedData
  
  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 503}
    )
  }
  // find Channel

  const foundChannel = await Channel.findOne({_id: channel})

  if(!foundChannel) {
    return NextResponse.json(
      {message: 'Error at connecting to the channel. Please try again later.'},
      {status: 404}
    )
  }

  const foundChannelOwner = await User.findOne({_id: channelOwnerId})

  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'Error at connecting to the channel. Please try again later.'},
      {status: 404}
    )
  }

    
  const createdPost = await Post.create({
    userId: foundChannelOwner._id,
    body: body
  })

  if(!createdPost) {
    return NextResponse.json(
      {message: 'Error at creating the post. Please try again later.'},
      {status: 500}
    )
  }

  foundChannel.posts.push(createdPost)

  try {
    await foundChannel.save()
  } catch (error) {
    return NextResponse.json({ message: 'Error at creating the post. Please try again later.' }, { status: 504 })
  }
    
    
  return NextResponse.json(
    { status: 200 },
  )
}