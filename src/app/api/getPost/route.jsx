'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req) {
  await dbConnect();

  let allPosts = await Post.find()
  if (allPosts) {
    return NextResponse.json(allPosts, { status: 200 })
  }
  else {
    return NextResponse('No post found', { status: 500 })
  }
}