'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function POST( req ) {
  const idx = await req.json()
  const id = idx[0]
  
  await dbConnect();
  
  let findOnePost = await Post.findOne({ _id: id })

  if (findOnePost) {
    return NextResponse.json({ data: findOnePost }, { status: 200 })
  }
  else {
    console.log('ERROR in findOnePost')
    return new NextResponse('No post found', { status: 500 })
  }
}