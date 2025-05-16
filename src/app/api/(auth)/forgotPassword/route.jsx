import User from '@/app/models/User'
import dbConnect from '@/app/util/DBConnect'
import { NextResponse } from 'next/server'
const Cryptr = require('cryptr')
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'
import { ForgotPasswordEmail } from '@/app/emails/authEmails'
import { sendEmail } from '@/app/util/sendEmail'

export const POST = async (req) => {
  const { findingEmail } = await req.json()
  
  try {
    await dbConnect()
    
  } catch (err) {
    return NextResponse.json('Error at connecting to server. Please try again.', {status: 400})
  }
  
  const foundUser = await User.findOne({email: findingEmail})
  if(foundUser) {
    const cryptr = new Cryptr('userId')

    const encryptedString = await cryptr.encrypt(foundUser._id.toString(), {encoding: 'hex', pbkdf2Iterations: 10000, saltLength: 10})
    // const decryptedString = await cryptr.decrypt(encryptedString)
    const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const expiredTime = () => {
      let addedTime = Date.now() + 5 * 60 * 1000
      let expiringTime = fromZonedTime(addedTime, currentZone)
      return expiringTime
    }

    let createdTokenTime = expiredTime()

    try {
      foundUser.resetPasswordToken = encryptedString,
      await foundUser.save()
    } catch (err) {
      return NextResponse.json({error: 'Error at updating user data. Please try again.'}, {status: 403})
    }

    try {
      foundUser.resetTokenExpire = createdTokenTime,
      await foundUser.save()
    } catch (err) {
      return NextResponse.json({error: 'Error at updating user data. Please try again.'}, {status: 403})
    }

    // send email with resetToken
    let emailContent = ForgotPasswordEmail(foundUser._id, encryptedString)

    let emailOptions = {
      from: 'noreply@streamconnect.net',
      to: findingEmail,
      subject: 'Stream Connect Password Reset Request',
      html: emailContent,
    }

    try {
      await sendEmail(emailOptions)
    } catch (err) {
      return NextResponse.json({error: 'Error occured while sending an email. Please try again.'})
    }

    // response

    const returningData = {
      user: foundUser,
      token: encryptedString,
    }

    return NextResponse.json(returningData, {status: 200})
  }

  return NextResponse.json({error: 'Provided email has not registered yet.'},{status:400})
} 