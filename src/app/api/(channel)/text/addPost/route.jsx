import dbConnect from '@/app/util/DBConnect'
import Channel from '@/app/models/Channels'
import Post from '@/app/models/post'
// import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();

  const input = receivedData.input
  const channelId = receivedData.channelId
  const postOwner = receivedData.postOwner

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error at connecting database at addPost' }, { status: 500 })
  }

  let createdPost = await Post.create({ body: input, postOwner: postOwner, channelId: channelId })
  if (!createdPost) {
    return NextResponse.json({ message: 'error creating a post at addPost' }, { status: 501 })
  }
  
  // let foundChannel = await Channel.findById(channelId).populate({ path: 'posts', populate: { path: 'comments' } })
  let foundChannel = await Channel.findById(channelId).populate('posts')
  if (!foundChannel) {
    return NextResponse.json({ message: 'error finding valid channel at addPost' }, { status: 502 })
  }

  foundChannel.posts.push(createdPost)

  try {
    await foundChannel.save()
  } catch (error) {
    return NextResponse.json({ message: 'error saving channel addPost' }, { status: 504 })
  }

  return NextResponse.json(foundChannel.posts, { status: 200 })
}