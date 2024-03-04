import User from '@/app/models/User';
import dbConnect from '@/app/util/DBConnect';
import { NextResponse } from 'next/server';

export const PUT = async (req) => {

  let userId = req.nextUrl.pathname.substr(-24)

  const {input} = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      { message: 'Database connection error, please try again later'},
      { status: 501 }
    )
  }
  let foundUser = await User.findById(userId)

  if(!foundUser) {
    return NextResponse.json(
      { message: 'Requested user does not exist, please try again.'},
      { status: 404 }
    )
  }

  try {
    foundUser.introduction = input
    await foundUser.save()
  } catch (err) {
    return NextResponse.json(
      { message: 'Error at updating user'},
      { status: 501 }
    )
  }

  return NextResponse.json(
    {message: foundUser},
    {status: 200}
  )
}