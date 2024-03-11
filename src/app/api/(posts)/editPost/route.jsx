'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const receivedData = await req.json()
  const id = receivedData.id
  const input = receivedData.input

  await dbConnect();

  console.log(receivedData)
  let updatedPost = await Post.findOneAndUpdate({ _id: id }, {body: input})

  if(updatedPost) {
    return new NextResponse(updatedPost, {status: 200})
  } else {
    return new NextResponse('ERROR in updatedPost', { status: 500 })
  }
}