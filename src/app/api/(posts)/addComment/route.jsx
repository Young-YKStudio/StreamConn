import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post';
import Comment from '@/app/models/Comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {

  const receivedData = await req.json();
  // const id = receivedData.id
  // const input = receivedData.input

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 501}
    )
  }

  const createdComment = await Comment.create({post: receivedData.id, body: receivedData.input})
  if (!createdComment) {
    return NextResponse.json(
      {message: 'Error creating comment'},
      {status: 501}
    )
  }

  let linkPost = await Post.findOne({_id: receivedData.id})
  if (!linkPost) {
    return NextResponse.json(
      {message: 'Error linking comment to a post'},
      {status: 501}
    )
  }

  linkPost.comments.push(createdComment._id)
  await linkPost.save()

  let allPost = await Post.find().populate({path: 'comments', model: Comment})
  return NextResponse.json(allPost, {status: 200})
}