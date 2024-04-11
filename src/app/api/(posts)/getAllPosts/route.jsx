'use server'

import dbConnect from '@/app/util/DBConnect';
import Channel from '@/app/models/Channels';
import Post from '@/app/models/post'
import Comment from '@/app/models/comment'
import User from '@/app/models/User'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  const {channelId} = await req.json();

  await dbConnect();

  // let test = await Channel.findById(channelId)
    // path: 'posts', 
  //   model: Post, 
      // populate: { 
  //     path: 'User.nickname',
  //     // select: 'nickname',
  //     model: User,
  //     options: { strictPopulate : false }
  //   }
  //     // populate: { path: 'user', select: 'nickname', options: {strictPopulate: false} } 
  // })

  // let test = await Channel.findById(channelId)
    // .populate({ path: 'posts', model: Post,
    //   populate: {
    //     path: 'userId',
    //     select: 'nickname',
    //     model: User,
    //   }


    // Channel.aggregate([
    //   {
    //     $lookup: {
    //       'from': 'posts',
    //       'localField': 'userId',
    //       'foreignField': 'nickname',
    //       'as': 'NICK'
    //     }
    //   }
    // ])

    // .populate({path: 'posts', populate: {path: 'userId', select: 'nickname'}})
    // .populate({path: 'comments', populate: {path: 'userId', select: 'nickname'}, options: {strictPopulate: false} })

    // .populate({path: 'posts', 
    //     populate: {path: 'userId', select: 'nickname'},
    //     populate: {path: 'comments', populate: {path: 'userId', select: 'nickname'} }
    // })

    // .populate({path: 'posts', 
    //     populate: {path: 'userId', model: User, select: 'nickname'} })
    // .populate({path: 'comments', 
    //     populate: {path: 'userId', model: User, select: 'nickname'}, options: {strictPopulate: false} })

    //   { path: 'posts', populate: {path: 'userId', select: 'nickname'} }
    // )

    // , options: {strictPopulate: false} })

    // .populate({ 
    //   path: 'posts', 
    //   model: Post, 
    //   populate: { 
    //     path: 'userId', 
    //     select: 'nickname', 
    //     model: User, 
    //     populate: { 
    //       path: 'comments', 
    //       model: Comment, 
    //       options: {strictPopulate: false} 
    //     }
    //   }
    // })
    // .then()

    // let test = await Post.find({ channelId: channelId })
    // .populate({path: 'userId', model: User, select: 'nickname'})
    // .populate({
    //   path: 'comments',
    //   model: Comment,
    //   populate: {
    //     path: 'userId', model: User, select: 'nickname'
    //   }
    // })

    let test = await Channel.findById(channelId)
    .populate({
      path: 'posts',
      model: Post,
      populate: {
        path: 'userId', model: User, select: 'nickname'
      }
    })
    // .populate({path: 'userId', model: User, select: 'nickname'})
    .populate([{
      path: 'comments',
      model: Comment,
      populate: {
        path: 'userId', model: User, select: 'nickname'
      }, options: {strictPopulate: false}
    }])


  console.log('TEST:', test)

  
  let foundChannel = await Channel.findById(channelId).populate({ path: 'posts', populate: { path: 'comments' } })
    if (!foundChannel) {
    return new NextResponse('No post found', { status: 200 })
  }

  return NextResponse.json(foundChannel, { status: 200 })

}