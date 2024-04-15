import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'

export const PUT = async (req) => {
  const { platforms, updatingUser } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {statut: 500}
    )
  }

  const updatedUser = await User.findOneAndUpdate({_id: updatingUser._id}, {platforms: platforms})

  if(!updatedUser) {
    return NextResponse.json(
      {message: 'Error at updating user information. Please try again later'},
      {status: 500}
    )
  }

  updatedUser.isUpdated = true

  await updatedUser.save()

  return NextResponse.json({status: 200})
}