'use server'

import dbConnect from '@/app/util/DBConnect';
// import Channel from '@/app/models/Channels';
// import Post from '@/app/models/post'
// import Comment from '@/app/models/comment'
// import User from '@/app/models/User'
import Team from '@/app/models/Teams'

import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();

  await dbConnect();
  
  // let foundChannel = await Team.find({teamOwner: teamOwner}).populate({ path: 'posts', populate: { path: 'comments' } })
  let foundTeam = await Team.find({ teamOwner: receivedData.teamOwner }).populate('teamOwner').populate('channels') // .populate({ path: 'teamOwner', populate: { path:'channels' } })

  if (!foundTeam) {
    return new NextResponse('No team found', { status: 200 })
  }

  return NextResponse.json(foundTeam, { status: 200 })
}