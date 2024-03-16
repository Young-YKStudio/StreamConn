'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const data = await req.json()

  await dbConnect();

  let foundPost

  try {
    foundPost = await Post.findOne({ _id: data.postId }).populate({path: 'comments', model: Comment})
  } catch (error) {
      return new NextResponse('ERROR finding Post', { status: 400 })
  }

  if (foundPost) {
    let tempArray = foundPost.comments
    let filteredArray = []
    
    tempArray.forEach((comment) => {
      if(comment._id != data.commentId) {
        filteredArray.push(comment)
      }
    })
    
    foundPost.comments = filteredArray

    try {
      await foundPost.save()
    } catch (error) {
      return new NextResponse('ERROR in save', { status: 400 })
    }
  }

  try {
    let deleteComment = await Comment.findByIdAndDelete({ _id: data.commentId })
  } catch (error) {
    return new NextResponse('ERROR findBy in deleteComment', { status: 400 })
  }

  let allPost = (await Post.find().populate({path: 'comments', model: Comment}))

  return NextResponse.json(allPost, {status: 200})
}