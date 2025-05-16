import User from '@/app/models/User'
import Channel from '@/app/models/Channels'
import Post from '@/app/models/post'
import Comment from '@/app/models/comment'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'
import Collarboration from '@/app/models/Collarborations'

export const POST = async (req) => {
  const submittedData = await req.json()

  
  const { channel, channelOwnerNickname } = submittedData
  
  if(!channel || !channelOwnerNickname) {
    return NextResponse.json(
      {message: 'please provide channel and channelOwner'},
      {status: 400}
    )
  }
    
  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }
      
  const foundChannelOwner = await User.findOne({nickname: channelOwnerNickname}).populate('blockedUsers').populate({path: 'channels', model: Channel})

  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'Channel owner not found'},
      {status: 404}
    )
  }

  // let foundEvents = await Channel.findById(channelId).populate({ path: 'posts', populate: { path: 'comments' } })
  let foundEvents = await User.findOne({nickname: channelOwnerNickname}).populate({path: 'channels', populate: { path: 'collarborations' } })
  // console.log('EVENTS:', foundEvents)

  let filteredEvents = []
  foundEvents.channels.map((col) => col.collarborations.forEach((cb) => filteredEvents.push(cb)) )
  console.log('COLS:', filteredEvents)

  let allEvents = []
  filteredEvents.forEach((cal, idx) => {
    let calendarEvents = 
    { 
      id: idx, 
      title: cal.eventName, 
      start: cal.eventDateStart,
      end: cal.eventDateEnd,
      resourceId: idx 
    }
    allEvents.push(calendarEvents)
  })

  console.log('ALL:', allEvents)

  const sendingData = {
    channelOwner: foundChannelOwner,
    channelEvents: filteredEvents,
    calendarEvents: allEvents,
  }
  
  return NextResponse.json(
    sendingData,
    {status: 200}
  )
}