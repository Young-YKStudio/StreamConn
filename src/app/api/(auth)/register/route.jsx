import User from '@/app/models/User';
// import User from '../../../../app/models/User'
import dbConnect from '@/app/util/DBConnect';
// import dbConnect from '../../../../app/util/DBConnect'
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, password } = await req.json()

  await dbConnect()

  const existingUser = await User.findOne({ email });

  if(existingUser) {
    return new NextResponse('Email is already registered', { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    // TODO: send email
    return NextResponse.json(
      { message: newUser },
      { status: 200 },
    )
  } catch (e) {
    return new NextResponse(e, { status: 500 })
  }
}