import User from '@/app/models/User';
// import User from '../../../../app/models/User'
import dbConnect from '@/app/util/DBConnect';
// import dbConnect from '../../../../app/util/DBConnect'
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, password, nickname } = await req.json()

  await dbConnect()

  const existingUser = await User.findOne({ email });

  if(existingUser) {
    return new NextResponse('Provided email is already registered', { status: 400 })
  }

  const duplicateNickname = await User.findOne({nickname: nickname})

  if(duplicateNickname) {
    return new NextResponse('Provided username is already taken', { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({
    email,
    password: hashedPassword,
    nickname: nickname
  })

  try {
    await newUser.save()
    // TODO: send email
    return NextResponse.json(
      { status: 200 },
    )
  } catch (e) {
    console.log(e)
    return new NextResponse('Error at updating user. Please try gain later.', { status: 500 })
  }
}