import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'
const Cryptr = require('cryptr')
import { fromZonedTime } from 'date-fns-tz'
import { isBefore } from 'date-fns'

export const POST = async (req) => {
  const {userId, token} = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json({error: 'Error at connecting to Database. Please try again.'}, {status: 400})
  }

  const foundUser = await User.findOne({_id: userId})
  
  if (!foundUser) {
    return NextResponse.json({error: 'User not found'}, {status: 404})
  }
  
  
  const cryptr = new Cryptr('userId')
  
  const decryptedString = await cryptr.decrypt(token)
  
  const compareId = (userId, tokenId) => {
    if(userId !== tokenId ) {
      return false
    }
    
    return true
  }

  let checkingIdAndToken = compareId(foundUser._id.toString(), decryptedString)

  if(!checkingIdAndToken) {
    return NextResponse.json({error: 'Token is not valid'}, {status: 403})
  }

  // check token expire

  let now = Date.now()
  const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  let nowInUTC = fromZonedTime(now, currentZone)

  let tokenExpireCheck = isBefore(nowInUTC, foundUser.resetTokenExpire)

  let returningData = {
    tokenStatus: tokenExpireCheck,
    user: foundUser,
  }

  return NextResponse.json(returningData, {status: 200})
}