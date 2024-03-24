import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/channels";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const submittedData = await req.json()

  const { channelName, channelOwner, channelType, isPrivate } = submittedData

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  let foundUser = await User.findOne({_id: channelOwner}).populate({path: 'channels', model: Channel})

  if(!foundUser) {
    return NextResponse.json(
      {message: 'Channel owner not found'},
      {status: 404}
    )
  }

  let duplicatedChannelName = foundUser.channels.find(channel => channel.channelName == channelName)

  if(duplicatedChannelName) {
    return NextResponse.json(
      {message: 'Channel name already exists'},
      {status: 404}
    )
  }

  let createdChannel = await Channel.create({
    channelName: channelName,
    channelOwner: foundUser._id,
    channelType: channelType,
    isPrivate: isPrivate
  })

  if(!createdChannel) {
    return NextResponse.json(
      {message: 'error creating channel'},
      {status: 500}
    )
  }

  foundUser.channels.push(createdChannel)

  try {
    await foundUser.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 501}
    )
  }

  return NextResponse.json(
    {message: 'channel created'},
    { status: 200 },
  )
}