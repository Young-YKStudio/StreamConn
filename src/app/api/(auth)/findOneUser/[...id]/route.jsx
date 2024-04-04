// USED IN HEADER, and REDUX

import User from "@/app/models/User";
import Channel from "@/app/models/Channels";
import dbConnect from "@/app/util/DBConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  let params = req.nextUrl.pathname
  let userId = params.substr(-24)

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      { message: 'Error at connecting to DB'},
      { status: 501 }
    )
  }

  let foundUser = await User.findOne({_id: userId}).populate('followers').populate('follows').populate('channels', {model: Channel})

  if(!foundUser) {
    return NextResponse.json(
      { message: 'User not found'},
      { status: 404 }
    )
  }

  let followers = foundUser.followers

  let returningData = {
    user: foundUser
  }

  return NextResponse.json(
    foundUser,
    { status: 200 }
  )
}