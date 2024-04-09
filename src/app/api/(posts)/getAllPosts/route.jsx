'use server'

import dbConnect from '@/app/util/DBConnect';
import Channel from '@/app/models/Channels';
// import Post from '@/app/models/post'
// import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const {channelId} = await req.json();

  await dbConnect();

  let foundChannel = await Channel.findById(channelId).populate({ path: 'posts', populate: { path: 'comments' } })
  // let foundChannel = await Channel.findById(channelId).populate({ path: 'posts', populate: 
  //                                                               { path: 'comments', populate: 
  //                                                               { path: 'user', select: 'nickname', options: {strictPopulate: false} } } } )
  if (!foundChannel) {
    return new NextResponse('No post found', { status: 200 })
  }

  return NextResponse.json(foundChannel, { status: 200 })

}