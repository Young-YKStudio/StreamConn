import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/post'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {

  const receivedData = await req.json();
  const input = receivedData.input

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 501}
    )
  }

  const createdPost = await Post.create({body: input})

  console.log(createdPost, 'at backend posting')

  return NextResponse.json(
    {message: 'success'},
    {status: 200}
  )

  // let params = req.nextUrl.pathname
  // let userId = params.substr(-24)

  // await dbConnect();

  // let allPosts = await Post.find()
  // if (allPosts) {
  //   return NextResponse.json({message: allPosts}, { status: 200 })
  // }
  // else {
  //   return NextResponse('No post found', { status: 500 })
  // }
}