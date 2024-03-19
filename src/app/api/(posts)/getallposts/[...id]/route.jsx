'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req) {

  let params = req.nextUrl.pathname
  let userId = params.substr(-24)

  await dbConnect();
  
  // let allPosts = await Post.find().populate('comments.body').exec()
  let allPosts = await Post.find({userId: userId}).populate({path: 'comments', model: Comment})

  if (allPosts) {
    return NextResponse.json({message: allPosts}, { status: 200 })
  }
  else {
    return NextResponse('No post found', { status: 500 })
  }
}