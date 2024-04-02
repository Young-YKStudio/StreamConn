import dbConnect from "@/app/util/DBConnect";
import Channel from '@/app/models/channels';
import User from '@/app/models/User'
import { NextResponse } from "next/server";

export async function POST(req) {

  const submittedData = await req.json()

  const { userId, channelName } = submittedData;

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  let foundUser = await User.findOne({_id: userId}).populate({path: 'channels', model: Channel})

  if(!foundUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 404}
    )
  }

  return NextResponse.json(
    foundUser,
    {message: 'reached route'},
    {status: 200}
  )
}