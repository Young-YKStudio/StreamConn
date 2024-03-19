'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  
  await dbConnect();

  // let allPosts = await Post.find( { userId: session.user.id } )
  try {
    let allPosts = await Post.find()
    if (allPosts) {
      return NextResponse.json(allPosts, { status: 200 })
    } else {
      return NextResponse('No post found', { status: 500 })
    }
  } catch (error) {
    return NextResponse('ERROR getAllPosts', { status: 500 })
  }
}