'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const data = await req.json();

  await dbConnect();

  const newPost = new Post({
    title: data.title,
    body: data.body,
    user: data.user,
  })

  try  {
    await newPost.save()
    return new NextResponse('post created', { status: 200 })
  } catch (e) {
    return new NextResponse(e, { status: 500 })
  }
}