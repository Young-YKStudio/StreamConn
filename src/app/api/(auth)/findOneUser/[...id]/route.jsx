import User from "@/app/models/User";
import dbConnect from "@/app/util/DBConnect";
import { NextResponse, NextRequest } from "next/server";

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

  let foundUser = await User.findOne({_id: userId})

  return NextResponse.json(
    { message: foundUser },
    { status: 200 }
  )
}