import { MdMoreHoriz, MdReply, MdDelete, MdEdit, MdOutlineThumbUp } from "react-icons/md";
import { useState } from 'react'
import { useSocket } from '@/app/util/SocketProvider'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export const InterActionBar = ({list, loggedUser, replyId, setReplyId, setEditText, channel, setReplyText, moreBox, setMoreBox}) => {

  const { socket } = useSocket()
  
  const router = useRouter()

  const buttonStyles = "px-2 py-0.5 rounded-md bg-black/10 text-slate-700 hover:bg-white/10 hover:text-white hover:cursor-pointer flex flex-row gap-1 items-center relative"

  const likeButtonHandler = async (e, post) => {
    if(!loggedUser) {
      return router.push('/login')
    }
    
    if(!post.likes) {
      return await socket.emit('AddLike', {user: loggedUser, post: post, channel: channel})
    }

    if(post.likes.length === 0) {
      return await socket.emit('AddLike', {user: loggedUser, post: post, channel: channel})
    }
    
    if(post.likes.length >= 1) {
      let alreadyLikedUser = post.likes.find((like) => like._id === loggedUser._id)

      if(alreadyLikedUser) {
        return await socket.emit('RemoveLike', {user: loggedUser, post: post, channel: channel})
      }
      return await socket.emit('AddLike', {user: loggedUser, post: post, channel: channel})
    } 
  }

  const replyButtonHandler = (e, post) => {
    if(replyId === post._id) {
      setReplyText('')
      setReplyId()
      return 
    }

    setReplyText('')
    setReplyId(post._id)
  }

  const moreButtonHandler = (e, post) => {
    if(moreBox === post._id) {
      setMoreBox()
      return
    }

    setMoreBox(post._id)
    console.log(post, `more clicked`)
  }

  const likeNumberDisplay = (post, user) => {

    if(!user) {
      return router.push('/login')
    }

    if(post.likes.length === 0) {
      return (
        <div 
          className={buttonStyles}
          onClick={(e) => {likeButtonHandler(e, list)}}
        >
          <MdOutlineThumbUp className="my-0.5"/>
        </div>
      )
    }

    if(loggedUser) {
      let alreadyLikedPost = post.likes.find(like => like._id === user._id)
  
      if(alreadyLikedPost) {
        return (
          <div 
            className={buttonStyles}
            onClick={(e) => {likeButtonHandler(e, list)}}
          >
            <MdOutlineThumbUp className="my-0.5"/>
            <p>{post.likes.length}</p>
          </div>
        )
      }
  
      return (
        <div 
          className={buttonStyles}
          onClick={(e) => {likeButtonHandler(e, list)}}
        >
          <MdOutlineThumbUp className="my-0.5"/>
          <p>{post.likes.length}</p>
        </div>
      )
    }
  }

  const moreButtonDisplay = (post, user) => {
    if(!user) {
      return router.push('/login')
    }
    // show delete if user is owner/admin of the post
    // show edit if user is owner/admin of the post
    // report post
    // reply
    console.log(post, 'post')
  }

  const deleteReplyButton = () => {
    // show delete button if user is owner / post owner / post admin
  }

  return (
    <div className="absolute top-2 right-4 flex flex-row gap-2 text-xs">
      {/* likes */}
        {likeNumberDisplay(list, loggedUser)}
      {/* reply */}
      <div 
        className={buttonStyles}
        onClick={(e) => {replyButtonHandler(e, list)}}
      >
        <MdReply />
      </div>
      {/* user button */}
      <div 
        className={buttonStyles}
        onClick={(e) => {moreButtonHandler(e, list)}}
      >
        <MdMoreHoriz />
      </div>

      {list._id === moreBox  && 
        <div className="absolute top-8 right-0 bg-black/10 p-2 rounded-md">
          {moreButtonDisplay(list, loggedUser)}
          <p>close button</p>
        </div>
      }
    </div>
  )
}