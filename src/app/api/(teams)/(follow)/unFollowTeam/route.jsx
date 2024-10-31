// USED in followAndSubscribe within redux
import dbConnect from "@/app/util/DBConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
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

  // find and delete channelOwner's follower for loggedUser
  let filteredFollowers = foundChannelOwner.followers.filter((followedUser) => followedUser._id.toString() !== foundLoggedUser._id.toString())

  try {
    foundChannelOwner.followers = filteredFollowers
    await foundChannelOwner.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 501}
    )
  }

  // find and delete loggedUser's follows for channel owner
  let filteredFollows = foundLoggedUser.follows.filter((followingStreamer) => followingStreamer._id.toString() !== foundChannelOwner._id.toString())

  try {
    foundLoggedUser.follows = filteredFollows
    await foundLoggedUser.save()
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