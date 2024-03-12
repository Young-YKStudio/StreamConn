import dbConnect from '@/app/util/DBConnect';
import Post from '@/app/models/Post';
import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {

  const receivedData = await req.json();
  const id = receivedData.id
  const input = receivedData.input
  console.log('RECEIVED DATA: ', receivedData)

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json(
      {message: 'error at connecting to database'},
      {status: 501}
    )
  }

  console.log('ID:', id, input)

  const createdComment = await Comment.create({post: id, body: input})
  if (!createdComment) {
    return NextResponse.json(
      {message: 'Error creating comment'},
      {status: 501}
    )
  }

  let linkPost = await Post.findOne({_id: id})
  if (!linkPost) {
    return NextResponse.json(
      {message: 'Error linking comment to a post'},
      {status: 501}
    )
  }

  linkPost.comments.push(createdComment._id)
  linkPost.save()

  console.log(createdComment, 'at backend new comment')

  return NextResponse.json(
    {message: 'success'},
    {status: 200}
  )
}