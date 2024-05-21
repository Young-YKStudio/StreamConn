import dbConnect from "@/app/util/DBConnect";
import { NextResponse } from "next/server";
import Collarboration from "@/app/models/Collarborations";
import User from '@/app/models/User';
import Channel from '@/app/models/Channels';

export async function POST(req) {
  const receivedData = await req.json()

  const { eventName, eventOwner, eventDateStart, eventDateEnd, eventDescription, isPrivate, channel, eventChannel } = receivedData;

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  const foundChannelOwner = await User.findOne({_id: eventOwner})

  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'Error at finding an user'},
      {status: 501}
    )
  }

  const foundEventChannel = await Channel.findOne({_id: eventChannel._id})

  if(!foundEventChannel) {
    return NextResponse.json(
      {message: 'Error at connecting to the channel. Please try again later.'},
      {status: 404}
    )
  }

  const createdCollarborationEvent = await Collarboration.create({
    eventName: eventName,
    eventOwner: foundChannelOwner,
    eventDateStart: eventDateStart,
    eventDateEnd: eventDateEnd,
    eventDescription: eventDescription,
    isPrivate: isPrivate,
    channel: foundEventChannel
  })

  if(!createdCollarborationEvent) {
    return NextResponse.json(
      {message: 'Error at creating the collarboration event. Please try again.'},
      {status: 500}
    )
  }

  foundEventChannel.collarborations.push(createdCollarborationEvent)

  try {
    await foundEventChannel.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at creating the collarboration event. Please try again.'},
      {status: 500}
    )
  }

  return NextResponse.json({status: 200})
}