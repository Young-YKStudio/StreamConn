'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const data = await req.json()
  const postId = data.id
  const userId = data.userId
  
  await dbConnect();

  // let deleteComments
  // let deletePost
  
  try {
    let deleteComments = await Comment.deleteMany({ postId: postId })
  } catch (error) {
    return new NextResponse('ERROR in deleteComments', { status: 400 })
  }

  let deletedPost = await Post.findByIdAndDelete({ _id: postId })

  if(deletedPost) {
    let allPost
    try{
      allPost = await Post.find({userId: userId}).populate({path: 'comments', model: Comment})
    } catch (error) {
      return new NextResponse('ERROR getting all Posts in deletedPost', { status: 400 })
    }
    return NextResponse.json(allPost, {status: 200})
  } else {
    return new NextResponse('ERROR in deletedPost', { status: 400 })
  }
}