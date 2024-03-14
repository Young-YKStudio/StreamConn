import dbConnect from '@/app/util/DBConnect'
import User from '@/app/models/User'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const userId = req.nextUrl.pathname.substr(-24)

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at connecting to DB'},
      {status: 501}
    )
  }

  let foundUser = await User.findOne({_id: userId}).populate({path: 'follows'})

  if(!foundUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 404}
    )
  }

  if(foundUser.follows.length === 0) {
    return NextResponse.json(
      {message: 'No Followers'},
      {status: 200}
    )
  }

  let shuffledFollows = []

  foundUser.follows.forEach((follow) => {
    if (follow.email != foundUser.email) {
      shuffledFollows.push(follow)
    }
  })

  if(shuffledFollows.length === 0) {
    return NextResponse.json(
      {message: 'No Followers'},
      {status: 200}
    )
  }

  // loop follows array and check if user is already in
  // shuffle array
  
  
  console.log(shuffledFollows, 'at backend')

  return NextResponse.json(
    shuffledFollows,
    {message: 'Found followers'},
    {status: 200}
  )

  // return NextResponse.json(
  //   foundUser,
  //   {status: 200}
  // )
}