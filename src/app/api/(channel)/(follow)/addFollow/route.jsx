// USED in followAndSubscribe within redux
import dbConnect from "@/app/util/DBConnect";
import User from '@/app/models/User'
import { NextResponse } from "next/server";

export async function POST(req) {
  const { channelOwner, loggedUser } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  const foundChannelOwner = await User.findOne({_id: channelOwner._id}).populate('follows').populate('followers')
  if(!foundChannelOwner) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 404}
    )
  }

  const foundLoggedUser = await User.findOne({_id: loggedUser._id}).populate('follows').populate('followers')

  if(!foundLoggedUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 404}
    )
  }
  
  // if logged user already follows current channel owner
  let duplicatedFollower = foundLoggedUser.follows.find((followingStreamer) => followingStreamer._id == channelOwner._id)

  if(duplicatedFollower) {
    return NextResponse.json(
      {message: 'You are already following this streamer'},
      {status: 404}
    )
  }

  // if channel owner already has current logged user as follower
  let duplicatedFollows = foundChannelOwner.followers.find((followedUser) =>  followedUser._id == foundLoggedUser._id)
  
  if(duplicatedFollows) {
    return NextResponse.json(
      {message: 'Streamer already has this follower'},
      {status: 404}
    )
  }

  foundLoggedUser.follows.push(foundChannelOwner)

  try {
    await foundLoggedUser.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 501}
    )
  }

  foundChannelOwner.followers.push(foundLoggedUser)

  try {
    await foundChannelOwner.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 501}
    )
  }

  return NextResponse.json(
    {status: 200}
  )
}