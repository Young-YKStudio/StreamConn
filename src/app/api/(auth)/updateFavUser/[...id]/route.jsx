import User from '@/app/models/User';
import dbConnect from '@/app/util/DBConnect';
import { NextResponse } from 'next/server';

export const PUT = async (req) => {
  let userId = req.nextUrl.pathname.substr(-24)
  
  const {follows} = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      { message: 'Database connection error, please try again later'},
      { status: 501 }
    )
  }

  let requestedUser = await User.findById(userId)

  if(!requestedUser) {
    return NextResponse.json(
      { message: 'Requested user does not exist, please try again.'},
      { status: 404 }
    )
  }

  // add user to follower's data

  try {
    follows.forEach( async (follow) => {
      let updatingUser = await User.findById(follow)
      updatingUser.followers.forEach(async follower => {
        let foundFollower = await User.findOne(follower)
        if(!foundFollower) {
          updatingUser.followers.push(requestedUser._id)
          await updatingUser.save()
        }
      })
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Database update error, please try again later'},
      { status: 501 }
    )
  }

  // add streamer to requestedUser
  try {
    follows.forEach( async (follow) => {
      let duplicatedStreamer = requestedUser.follows.find(async streamer => {
        let foundStreamer = await User.findOne(streamer)
        if(!foundStreamer) {
          requestedUser.follows.push(follow)
          await requestedUser.save() 
        } 
      })
    })
  } catch (err) {
    return NextResponse.json(
      {messgae: 'Database update error, please try again later'},
      {status: 501}
    )
  }

  try {
    requestedUser.isUpdated = true
    await requestedUser.save()
  } catch (err) {
    return NextResponse.json(
      { message: 'Database update error, please try again later'},
      { status: 501 }
    )
  }
  
  return NextResponse.json(
    {message: 'route reached'},
    {status: 200}
  )
}