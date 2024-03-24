'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const receivedData = await req.json()

  const commentId = receivedData.commentId
  const input = receivedData.input
  const userId = receivedData.userId

  try {
    await dbConnect();
  } catch (err) {
    return NextResponse.json({ message: 'error at connecting to database'}, { status: 500 })
  }

  if(!commentId || !input) {
    return NextResponse.json({ message: 'required userId and updating body'}, { status: 500 })
  }

  let updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, { body: input })
  if(!updatedComment) {
    return NextResponse.json({ message: 'error in updating post'}, { status: 500 })
  }

  let allPost = await Post.find().populate({ path: 'comments', model: Comment })

  return NextResponse.json(allPost, {status: 200})
}