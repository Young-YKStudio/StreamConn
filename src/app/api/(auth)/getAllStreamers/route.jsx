import User from '@/app/models/User';
import dbConnect from '@/app/util/DBConnect';
import { NextResponse } from 'next/server';

export const GET = async () => {

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      { message: 'Database connection error, please try again later' },
      { status: 501 }
    )
  }

  const foundStreamers = await User.find({isStreamer: true})

  return NextResponse.json(
    {message: foundStreamers},
    { status: 200 }
  )
}