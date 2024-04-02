'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const data = await req.json()
  
  const postId = data.postId
  const commentId = data.commentId

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error connecting DB from deleteComment' }, { status: 500 })
  }
  
  let foundPost = await Post.findById(postId).populate({ path: 'comments', model: Comment })
  if (!foundPost) {
    return NextResponse.json({ message: 'Error finding post from deleteComment' }, { status: 502 })
  }
  
  let tempArray = foundPost.comments
  let filteredArray = []
  tempArray.forEach((comment) => {
    if (comment._id != commentId) {
      filteredArray.push(comment)
    }
  })
  
  foundPost.comments = filteredArray
  
  try {
    await foundPost.save()
  } catch (error) {
    return new NextResponse('Error saving from deleteComment', { status: 503 })
  }
  
  let deleteComment = await Comment.findByIdAndDelete(commentId)
  if (!deleteComment) {
    return NextResponse.json({ message: 'Error deleting comment from deleteComment' }, { status: 501 })
  }

  let allPosts = await Post.find().populate({ path: 'comments', model: Comment })

  return NextResponse.json(allPosts, { status: 200 })
}