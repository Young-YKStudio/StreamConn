'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req) {

  let params = req.nextUrl.pathname
  let userId = params.substr(-24)

  await dbConnect();
  
  // let foundArticle = await Article.findOne({_id: id }).populate('comments').exec()

  // let allPosts = await Post.find().sort({updatedAt: 1}).populate(
  // let allPosts = await Post.find().populate('comments.body').exec()
  let allPosts = await Post.aggregate([{ 
    $lookup:
    {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'replies'
    }
  }])

  if (allPosts) {
    console.log(allPosts)
  }

  if (allPosts) {
    return NextResponse.json({message: allPosts}, { status: 200 })
  }
  else {
    return NextResponse('No post found', { status: 500 })
  }
}