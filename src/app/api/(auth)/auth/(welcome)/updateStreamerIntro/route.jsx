import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'

export const PUT = async (req) => {

  const received = await req.json()
  const { id, input } = received

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
      )
    }

  const updatedUser = await User.findOneAndUpdate({_id: id},{introduction: input})

  if(!updatedUser) {
    return NextResponse.json(
      {message: 'Error at updating user information. Please try again later'},
      {status: 500}
    )
  }

  return NextResponse.json(
    {status: 200}
  )
} 