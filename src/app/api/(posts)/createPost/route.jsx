import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {

  const receivedData = await req.json();
  const input = receivedData.input

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 501}
    )
  }

  const createdPost = await Post.create({body: input})

  if (createdPost) {
    let allPost = (await Post.find().populate({path: 'comments', model: Comment}))

    return NextResponse.json(allPost, {status: 200})
  }

}