'use server'

import dbConnect from '@/app/util/DBConnect';
import Channel from '@/app/models/Channels';
import Post from '@/app/models/post';
import Comment from '@/app/models/comment';
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req) {
  const receivedData = await req.json()

  const channelId = receivedData.channelId
  const postId = receivedData.postId

  try {
    await dbConnect()
  } catch (error) {
    return NextResponse.json({ message: 'error connecting DB from deletePost' }, { status: 400 })
  }

  let foundChannel = await Channel.findById(channelId).populate('posts')
  if (!foundChannel) {
    return new NextResponse('ERROR finding channel from deletePost', { status: 401 })
  }
    
  let tempArray = foundChannel.posts
  let filteredArray = []
    
  tempArray.forEach((post) => {
    if (post._id != postId) {
      filteredArray.push(post)
    }
  })

  foundChannel.posts = filteredArray

  try {
    await foundChannel.save()
  } catch (error) {
    return new NextResponse('ERROR saving deleting post link from deletePost', { status: 402 })
  }

  let deletedPost = await Post.findByIdAndDelete(postId)
  if (!deletedPost) {
    return new NextResponse('ERROR finding post from deletePost', { status: 403 })
  }

  let deleteComments = await Comment.deleteMany({ postId: deletedPost._id })
  if (!deleteComments) {
    return new NextResponse('ERROR deleting all comments for a post from deletePost', { status: 500 })
  }

  let allPosts = await Post.find({ channelId: channelId }).populate('comments')

  return NextResponse.json(allPosts, { status: 200 })
}