import dbConnect from '@/app/util/DBConnect'
import User from '@/app/models/User'
import Collarboration from '@/app/models/Collarborations'
import CollaboInvitation from '@/app/models/CollaboInvitation'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { event, invitedUser, loggedUser } = await req.json()

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database', error: err.message},
      {status: 500}
    )
  }
  
  // 1. find loggedUser from db
  let foundLoggedUser

  try {
    foundLoggedUser = await User.findOne({nickname: loggedUser.nickname})
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at finding loggedUser', error: err.message},
      {status: 500}
    )
  }

  // 2. find invitedUser from db
  let foundInvitedUser

  try {
    foundInvitedUser = await User.findOne({nickname: invitedUser.nickname})
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at finding loggedUser', error: err.message},
      {status: 500}
    )
  }
  
  // 3. find event from db
  let foundEvent

  try {
    foundEvent = await Collarboration.findOne({_id: event._id})
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at finding event', error: err.message},
      {status: 500}
    )
  }
  
  // 4. register invitaion in db

  let createdInvitation

  try {
    createdInvitation = await CollaboInvitation.create({
      collabEvent: foundEvent,
      invitedUser: foundInvitedUser,
      invitedBy: foundLoggedUser,
      invitationStatus: 'created'
    })
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at creating invitation', error: err.message},
      {status: 500}
    )
  }

  let savingInvitationFormat = {
    invitation: createdInvitation,
    status: 'Sent'
  }

  let savingInvitedUserFormat = {
    user: foundInvitedUser,
    status: 'Sent'
  }

  foundEvent.invitations.push(savingInvitationFormat)
  foundEvent.collarboratedUsers.push(savingInvitedUserFormat)

  try {
    await foundEvent.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at updating invitations', error: err.message},
      {status: 500}
    )
  }
  
  if(!foundLoggedUser.invitationSent) {
    foundLoggedUser.invitationSent = []
  }
  if(!foundLoggedUser.invitationSent) {
    foundInvitedUser.invitationReceived = []
  }
  

  let savingInvitationSentFormat = {
    collaboInvitation: createdInvitation,
    collaboEvent: foundEvent,
    invitationSentTo: foundInvitedUser,
    status: 'sent'
  }

  let savingInvitationReceivedFormat = {
    collaboInvitation: createdInvitation,
    collaboEvent: foundEvent,
    invitationReceivedFrom: foundLoggedUser,
    status: 'sent'
  }

  foundLoggedUser.invitationSent.push(savingInvitationSentFormat)

  try {
    await foundLoggedUser.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at updating loggedUser information', error: err.message},
      {status: 500}
    )
  }

  foundInvitedUser.invitationReceived.push(savingInvitationReceivedFormat)

  try {
    await foundInvitedUser.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'Error at updating invitedUser information', error: err.message},
      {status: 500}
    )
  }

  let data = {
    invitationId: createdInvitation._id,
  }

  return NextResponse.json(
    data,
    {status: 200}
  )
}

// 5. update invitaion in event db
// 6. return