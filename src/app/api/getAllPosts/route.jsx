'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  await dbConnect();

  let allPosts = await Post.find()
  if (allPosts) {
    return NextResponse.json(allPosts, { status: 200 })
  }
  else {
    console.log('ERROR in getAllPosts')
    return NextResponse('No post found', { status: 500 })
  }
}