import User from '@/app/models/User';
import dbConnect from '@/app/util/DBConnect';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req) => {
  let userId = req.nextUrl.pathname.substr(-24)
  
  const receivedData = await req.json()

  let updatingArry = []
  receivedData.forEach((platform) => {
    if(platform.checked) {
      let newObj = {
        name: platform.name,
        href: platform.href,
      }
      updatingArry.push(newObj)
    }
  })

  try {
    await dbConnect()
  } catch (err) {
  return NextResponse.json(
    { message: 'Error at connecting to DB'},
    { status: 501 }
    )
  }
  
  let foundUser = await User.findById(userId)

  if(!foundUser) {
    return NextResponse.json(
      { message: 'User not found'},
      { status: 404 }
    )
  }

  try {
    foundUser.platforms = updatingArry
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