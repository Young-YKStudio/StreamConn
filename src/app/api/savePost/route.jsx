'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const data = await req.json();

  await dbConnect();

  let updatedPost = await Post.findOneAndUpdate({ _id: data.id }, {title: data.title, body: data.body, user: data.user})

  if(updatedPost) {
    return new NextResponse(updatedPost, {status: 200})
  } else {
    return new NextResponse('ERROR in updatedPost', { status: 500 })
  }
}