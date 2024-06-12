import dbConnect from "@/app/util/DBConnect";
import Upload from "@/app/models/Uploads";
import User from "@/app/models/User";
import { NextResponse } from 'next/server'

export async function POST(req) {
  const receivedData = await req.json()

  const { fileData, loggedUser } = receivedData

  try {
    await dbConnect()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 500}
    )
  }

  const foundLoggedUser = await User.findOne({nickname: loggedUser.nickname})

  if(!foundLoggedUser) {
    return NextResponse.json(
      {message: 'User not found'},
      {status: 204}
    )
  }

  const createdUpload = await Upload.create({
    name: fileData.name,
    url: fileData.url,
    key: fileData.key,
    type: fileData.type,
    size: fileData.size
  })

  if(!createdUpload) {
    return NextResponse.json(
      {status: 503}
    )
  }

  try {
    foundLoggedUser.uploadedFiles.push(createdUpload)
    await foundLoggedUser.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating user'},
      {status: 503}
    )
  }

  try {
    createdUpload.uploadedUser = foundLoggedUser
    await createdUpload.save()
  } catch (err) {
    return NextResponse.json(
      {message: 'error at updating upload'},
      {status: 503}
    )
  }

  return NextResponse.json(
    createdUpload,
    {status: 200}
  )
}