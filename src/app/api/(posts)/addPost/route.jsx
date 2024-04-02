import dbConnect from '@/app/util/DBConnect'
import Channel from '@/app/models/channels'
import Post from '@/app/models/post'
// import Comment from '@/app/models/comment'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const receivedData = await req.json();

  const input = receivedData.input
  const userId = receivedData.userId
  const channelName = receivedData.channelName
  const channelOwnerId = receivedData.channelOwnerId

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error at connecting database at addPost' }, { status: 500 })
  }

  let createdPost = await Post.create({ body: input, userId: userId })
  if (!createdPost) {
    return NextResponse.json({ message: 'error creating a post at addPost' }, { status: 501 })
  }
  
  let foundChannel = await Channel.findOne({ channelName: channelName, channelOwner: channelOwnerId }).populate({ path: 'posts', model: Post })
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