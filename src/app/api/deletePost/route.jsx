'use server'

import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const data = await req.json();

  console.log('api del data:', data)

  await dbConnect();

  let delPost = await Post.findOneAndDelete( {_id: data._id })
  // const newPost = new Post({
  //   id: data._id,
    // title: data.title,
    // body: data.body,
  // })

  try  {
    // await newPost.findOneAndDelete({ _id: id })
    return new NextResponse('post deleted', { status: 200 })
  } catch (e) {
    return new NextResponse(e, { status: 500 })
  }
}