'use server'

import dbConnect from '@/app/util/DBConnect';
// import Channel from '@/app/models/Channels';
import User from '@/app/models/User'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();
  // console.log('API NICK:', receivedData)
  
  await dbConnect();
  
  let foundUser = await User.findById(receivedData.id).populate({path:'moderators', model: User, select: 'nickname'})

  if (!foundUser) {
    return NextResponse.json({message: 'No user found'}, { status: 404 })
  }
  
  return NextResponse.json(foundUser, { status: 200 })
}