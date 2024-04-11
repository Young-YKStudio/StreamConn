'use server'

import dbConnect from '@/app/util/DBConnect';
import Channel from '@/app/models/Channels';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment'
import User from '@/app/models/User'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const {channelId} = await req.json();

  await dbConnect();
  
  let foundChannel = await Channel.findById(channelId).populate({ path: 'posts', populate: { path: 'comments' } })
    if (!foundChannel) {
    return new NextResponse('No post found', { status: 200 })
  }

  return NextResponse.json(foundChannel, { status: 200 })

}