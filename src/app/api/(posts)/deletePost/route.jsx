'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const data = await req.json()
  
  await dbConnect();

  // let deleteComments
  // let deletePost
  
  try {
    let deleteComments = await Comment.deleteMany({ post: data.id })
  } catch (error) {
    return new NextResponse('ERROR in deleteComments', { status: 400 })
  }

  let deletedPost = await Post.findOneAndDelete({ _id: data.id })

  if(deletedPost) {
    let allPost
    try{
      allPost = (await Post.find().populate({path: 'comments', model: Comment}))
    } catch (error) {
      return new NextResponse('ERROR getting all Posts in deletedPost', { status: 400 })
    }
    return NextResponse.json(allPost, {status: 200})
  } else {
    return new NextResponse('ERROR in deletedPost', { status: 400 })
  }
}