'use server'

import dbConnect from '@/app/util/DBConnect';
import Channel from '@/app/models/channels';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();

  const channelName = receivedData.channelName
  const channelOwner = receivedData.channelOwner

  await dbConnect();
  
  let foundChannel = await Channel.find({ channelName: channelName, channelOwner: channelOwner }).populate({ path: 'posts', populate: { path: 'comments' } })
  if (foundChannel) {
    let allPosts = foundChannel[0].posts
    
    if (allPosts.length > 0) {
      return NextResponse.json({ message: allPosts }, { status: 200 })
    } else {
      return new NextResponse('No post found', { status: 200 })
    }
  } else {
    return new NextResponse('No channel found', { status: 500 })
  }
}