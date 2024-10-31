import dbConnect from '@/app/util/DBConnect'
// import Channel from '@/app/models/Channels'
// import Post from '@/app/models/post'
// import Comment from '@/app/models/comment'
import Team from '@/app/models/Teams'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();

  const teamName = receivedData.teamName
  const teamOwner = receivedData.teamOwner
  const teamOwnerNickname = receivedData.teamOwnerNickname

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error at connecting database at addNewTeam' }, { status: 500 })
  }

  let foundTeam = await Team.findOne({ teamName: teamName })
  if (foundTeam) {
    return NextResponse.json({ message: 'duplicated team name' }, { status: 501 })
  }

  let teamCreated = await Team.create({ teamName: teamName, teamOwner: teamOwner, teamOwnerNickname: teamOwnerNickname })
  if (!teamCreated) {
    return NextResponse.json({ message: 'error creating a team at addNewTeam' }, { status: 501 })
  }

  let foundTeams = await Team.find({ teamOwner: teamOwner })

  return NextResponse.json(foundTeams, { status: 200 })
  

  // let foundChannel = await Channel.findById(channelId).populate({ path: 'posts', populate: { path: 'comments' } })
  // let foundChannel = await Channel.findById(channelId).populate('posts')
  // if (!foundChannel) {
  //   return NextResponse.json({ message: 'error finding valid channel at addPost' }, { status: 502 })
  // }

  // foundChannel.posts.push(createdPost)

  // try {
  //   await foundChannel.save()
  // } catch (error) {
  //   return NextResponse.json({ message: 'error saving channel addPost' }, { status: 504 })
  // }

}