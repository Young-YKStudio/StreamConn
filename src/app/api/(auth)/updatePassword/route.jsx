import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'
import { sendEmail } from '@/app/util/sendEmail'
import { resettedPassword } from '@/app/emails/authEmails'

export const PUT = async (req) => {
  const { userId, newPassword } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json({error: 'Error at connecting to Database. Please try again.'}, {status: 400})
  }

  const foundUser = await User.findOne({_id: userId})

  if(!foundUser) {
    return NextResponse.json({error: 'User not found'}, {status: 404})
  }

  foundUser.newPassword = newPassword

  try {
    await foundUser.save()
  } catch (err) {
    return NextResponse.json({error: 'Error at updating your password. Please try again.'}, {status: 403})
  }

  // email

  let emailContent = resettedPassword(foundUser.nickname)

  let emailOptions = {
    from: 'noreply@streamconnect.net',
    to: foundUser.email,
    subject: 'Stream Connect Password has been updated',
    html: emailContent,
  }

  try {
    await sendEmail(emailOptions)
  } catch (err) {
    return NextResponse.json({error: 'Error occured while sending an email. Please try again.'})
  }

  return NextResponse.json(foundUser, {status: 200})
}
