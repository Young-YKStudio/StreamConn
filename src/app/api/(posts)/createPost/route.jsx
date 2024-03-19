import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {

  const receivedData = await req.json();
  const input = receivedData.input
  const userId = receivedData.userId

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 501}
    )
  }

  const createdPost = await Post.create({ body: input, userId: userId })

  if (createdPost) {
    let allPost = (await Post.find({userId: userId}).populate({path: 'comments', model: Comment}))

    return NextResponse.json(allPost, {status: 200})
  }

}