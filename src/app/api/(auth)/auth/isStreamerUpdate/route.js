import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse, NextRequest } from 'next/server'

export const POST = async (req) => {

  const {id} = await req.json()

  if(!id) {
    return NextResponse.json(
      {message: 'No user info provided'},
      {status: 403}
    )
  }

  try {
    await dbConnect()
  } catch (e) {
    return NextResponse.json(
      {message: 'Error at connecting to DB'},
      {status: 501}
    )
  }

  const foundUser = await User.findOne({_id: id})

  if(foundUser) {
    foundUser.isStreamer = true
    await foundUser.save()
    return NextResponse.json(
      {message: foundUser},
      {status: 200}
    )
  } else {
    return NextResponse.json(
      {message: 'No user found'},
      {status: 303}
    )
  }
}