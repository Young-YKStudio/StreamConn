'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post'
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const data = await req.json()
  
  await dbConnect();

  let deletedPost = await Post.findOneAndDelete({ _id: data.id })

  if(deletedPost) {
    return new NextResponse(deletedPost, {status: 200})
  } else {
    return new NextResponse('ERROR in deletedPost', { status: 500 })
  }
}