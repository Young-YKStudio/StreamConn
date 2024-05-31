import IGBGToken from '@/app/models/IGDBData'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'

export async function POST(req, res) {

  try {
    await dbConnect();
  } catch (err) {
    return NextResponse.json(
      { message: 'Server error', error: err.message },
      { status: 500 }
    )
  }

  const { token } = await req.json()

  if(token) {
    let newToken = new IGBGToken({token: token})

    try {
      await newToken.save()
    } catch (err) {
      return NextResponse.json(
        { message: 'Error at saving Token at DB', error: err.message },
        { status: 500 }
      )
    }
  }

  console.log(token, 'at api')

  return NextResponse.json(
    { message: 'Token saved successfully', token: token },
    { status: 200 }
  )
}


