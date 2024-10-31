// USED in followAndSubscribe within redux
import dbConnect from "@/app/util/DBConnect";
import Team from '@/app/models/Teams'
import User from '@/app/models/User'
import { NextResponse } from "next/server";

export async function POST(req) {
  const { teamName, teamOwner, loggedUser } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  if (loggedUser._id == teamOwner) {
    console.log(`API:`, loggedUser._id, teamOwner)
    return NextResponse.json(
      {message: 'You are already team owner'},
      {status: 501}
    )
  }

  const foundTeam = await Team.findOne({ teamName: teamName }).populate('followers')
  if(!foundTeam) {
    return NextResponse.json(
      {message: 'Team not found'},
      {status: 404}
    )
  }

  const foundLoggedUser = await User.findOne({_id: loggedUser._id}).populate('follows').populate('teams')

  if(!foundLoggedUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 404}
    )
  }
  
  // if logged user already follows current team owner
  let duplicatedFollower = foundLoggedUser.teams.find((followingTeam) => followingTeam.followers == loggedUser._id)
  
  console.log('DUP USER FOUND?', duplicatedFollower, loggedUser._id)
  if(duplicatedFollower) {
    return NextResponse.json(
      {message: 'You are already following this team'},
      {status: 404}
    )
  }

  // if channel owner already has current logged user as follower
  let duplicatedFollows = foundTeam.followers.find((followedUser) =>  followedUser._id == foundLoggedUser._id)
  
  if(duplicatedFollows) {
    return NextResponse.json(
      {message: 'Team already has this follower'},
      {status: 404}
    )
  }

  foundLoggedUser.follows.push(foundTeam)

  try {
    await foundLoggedUser.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 501}
    )
  }

  foundTeam.followers.push(foundLoggedUser)

  try {
    await foundTeam.save()
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