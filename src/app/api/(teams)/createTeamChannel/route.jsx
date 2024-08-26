import dbConnect from "@/app/util/DBConnect";
import Channel from "@/app/models/Channels";
import User from '@/app/models/User';
import { NextResponse } from "next/server";
import Team from "@/app/models/Teams";

export async function POST(req) {

  const submittedData = await req.json()
  
  const { teamName, channelName, channelOwner, author, isPrivate, channelType } = submittedData
  
  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }
    
  // let foundChannelOwner = await User.findOne({_id: channelOwner}).populate({path: 'channels', model: Channel})
  let foundChannelOwner = await User.findOne({_id: channelOwner})

  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'Team channel owner not found'},
      {status: 404}
    )
  }
    
  let foundTeam = await Team.findOne({teamName: teamName}).populate('channels')
  if (!foundTeam) {
    return NextResponse.json(
      {message: 'Team not found'},
      {status: 404}
    )
  }
  
  let duplicatedTeamChannelName = foundTeam.channels.find(channel => channel.channelName == channelName)

  if(duplicatedTeamChannelName) {
    return NextResponse.json(
      {message: 'Team channel name already exists'},
      {status: 404}
    )
  }

  let createdTeamChannel = await Channel.create({
    channelName: channelName,
    // channelOwner: foundChannelOwner._id,
    channelOwner: foundTeam._id,
    channelType: channelType,
    isPrivate: isPrivate
  })

  if(!createdTeamChannel) {
    return NextResponse.json(
      {message: 'Error at creating team channel. Please try again.'},
      {status: 500}
    )
  }
  
  foundTeam.channels.push(createdTeamChannel)

  try {
    await foundTeam.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating Team'},
      {status: 501}
    )
  }

  return NextResponse.json(
    {message: 'channel created'},
    { status: 200 },
  )
}

// TODO: maybe add author in channel creation?