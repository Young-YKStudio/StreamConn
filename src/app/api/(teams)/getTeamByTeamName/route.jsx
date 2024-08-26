'use server'

import dbConnect from '@/app/util/DBConnect';
import Channel from '@/app/models/Channels';
// import Post from '@/app/models/post'
// import Comment from '@/app/models/comment'
import User from '@/app/models/User'
import Team from '@/app/models/Teams'
import Collarboration from '@/app/models/Collarborations';

import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();
  const { teamChannelName, teamName } = receivedData

  await dbConnect();
  
  let foundTeam = await Team.findOne({ teamName: teamName }).populate('teamOwner').populate('channels').populate('collaborations')

  if (!foundTeam) {
    return new NextResponse('No team found', { status: 200 })
  }

  return NextResponse.json(foundTeam, { status: 200 })
}