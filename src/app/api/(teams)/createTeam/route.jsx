import dbConnect from "@/app/util/DBConnect";
import Team from "@/app/models/Teams";
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {

  const submittedData = await req.json()
  
  const { teamName, teamOwner, author, isPrivate, teamType } = submittedData
  
  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }
    
  let foundTeamOwner = await User.findOne({_id: teamOwner}).populate({path: 'teams', model: Team})
  
  if(!foundTeamOwner) {
    return NextResponse.json(
      {message: 'Team owner not found'},
      {status: 404}
    )
  }
    
  let duplicatedTeamName = foundTeamOwner.teams.find(team => team.teamName == teamName)

  if(duplicatedTeamName) {
    console.log('duplicate!')
    return NextResponse.json(
      {message: 'Team name already exists'},
      {status: 404}
    )
  }

  let createdTeam = await Team.create({
    teamName: teamName,
    teamOwner: foundTeamOwner._id,
    teamOwnerNickname: foundTeamOwner.nickname,
    teamType: teamType,
    isPrivate: isPrivate
  })

  if(!createdTeam) {
    return NextResponse.json(
      {message: 'Error at creating the team. Please try again.'},
      {status: 500}
    )
  }

  foundTeamOwner.teams.push(createdTeam)

  try {
    await foundTeamOwner.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 501}
    )
  }

  return NextResponse.json(
    {message: 'team created'},
    { status: 200 },
  )
}
