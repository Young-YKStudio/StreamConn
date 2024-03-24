'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const receivedData = await req.json()
  
  const postId = receivedData.postId
  const input = receivedData.input

  try {
    await dbConnect();
  } catch (err) {
    return NextResponse.json({ message: 'error at connecting to database'}, { status: 500 })
  }

  if (!postId || !input) {
    return NextResponse.json({ message: 'required userId and updating body'}, { status: 500 })
  }

  let updatedPost = await Post.findOneAndUpdate({ _id: postId }, { body: input })
  if (!updatedPost) {
    return NextResponse.json({ message: 'error in updating post'}, { status: 500 })
  }

  let allPost = await Post.find().populate({ path: 'comments', model: Comment })

  return NextResponse.json(allPost, { status: 200 })
}