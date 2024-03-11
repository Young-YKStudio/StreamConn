'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req) {

  let params = req.nextUrl.pathname
  let userId = params.substr(-24)

  await dbConnect();

  let allPosts = await Post.find()

  // let foundArticle = await Article.findOne({_id: id }).populate('comments').exec()

  if (allPosts) {
    return NextResponse.json({message: allPosts}, { status: 200 })
  }
  else {
    return NextResponse('No post found', { status: 500 })
  }
}