import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
import Post from "@/app/models/post";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const {id} = await req.json()

  try { 
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  const foundChannel = await Channel.findOne({_id: id}).populate({path: 'posts', model: Post})

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