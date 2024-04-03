import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const submittedData = await req.json()

  
  const { channelName, channelOwner, author, isPrivate, channelType } = submittedData
  
  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }
    
  let foundChannelOwner = await User.findOne({_id: channelOwner}).populate({path: 'channels', model: Channel})
  
  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'Channel owner not found'},
      {status: 404}
    )
  }
    
  let duplicatedChannelName = foundChannelOwner.channels.find(channel => channel.channelName == channelName)

  if(duplicatedChannelName) {
    console.log('duplicate!')
    return NextResponse.json(
      {message: 'Channel name already exists'},
      {status: 404}
    )
  }

  let createdChannel = await Channel.create({
    channelName: channelName,
    channelOwner: foundChannelOwner._id,
    channelType: channelType,
    isPrivate: isPrivate
  })

  if(!createdChannel) {
    return NextResponse.json(
      {message: 'Error at creating the channel. Please try again.'},
      {status: 500}
    )
  }

  foundChannelOwner.channels.push(createdChannel)

  try {
    await foundChannelOwner.save()
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

// TODO: maybe add author in channel creation?