import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post';
import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();

  const postId = receivedData.postId
  const input = receivedData.input
  const userId = receivedData.userId

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error connecting to database from addComment' }, { status: 501 })
  }

  let foundPost = await Post.findOne({ _id: postId })
  if (!foundPost) {
    return NextResponse.json({ message: 'Error finding a post from addComment' }, { status: 502 })
  }

  let createdComment = await Comment.create( {postId: postId, body: input, userId: userId })
  if (!createdComment) {
    return NextResponse.json({ message: 'Error creating comment'}, { status: 501 })
  }
  
  foundPost.comments.push(createdComment)
  
  try {
    await foundPost.save()
  } catch (error) {
    return NextResponse.json({ message: 'error saving post at addComment' }, { status: 504 })
  }

  let allPosts = await Post.find().populate({ path: 'comments', model: Comment })
  
  return NextResponse.json(allPosts, { status: 200 })
}