'use client'

import { useSocket } from '@/app/util/SocketProvider'
import TextareaAutosize from 'react-textarea-autosize'
import { useState } from 'react'
import { MdTurnLeft, MdAddCircle } from "react-icons/md";

export const ReplyPost = ({replyText, setReplyText, setReplyId, loggedUser, list, channel, hoveredList}) => {
  const { socket } = useSocket()

  const clearButtonClickHandler = (e) => {
    setReplyText('')
    setReplyId()
  }

  const replySubmitHandler = async (e) => {
    e.preventDefault()

    
    // TODO: alert to login
    if(!loggedUser || !channel || !list || !replyText) {
      return
    }  
    
    let trimmedText = replyText.trim()
    
    if(trimmedText === '') {
      return
    }  
    
    let sendingData = {
      channelId: channel,
      loggedUser: loggedUser,
      body: replyText,
      replyTo: list
    }

    await socket.emit('replySubmit', sendingData)

    setReplyText('')
    setReplyId()
  }

  return (
    <div className='w-full flex flex-row flex-nowrap items-center mt-2'>
      <MdTurnLeft className={`w-5 h-5 rotate-180 mr-2 + ${hoveredList  === list._id ? 'text-white' :'text-sky-400'}`} />
      <form className='w-full flex flex-row flex-nowrap' onSubmit={replySubmitHandler}>
        <input
          type='text'
          className='w-full bg-slate-400 focus:ring-0 rounded-l-md border-transparent focus:border-transparent text-sm text-white'
          placeholder='reply on this post'
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        ></input>
        <div
          className='flex flex-row flex-nowrap'
        >
          <button 
            type='submit'
            className='bg-sky-500 text-xs px-4 py-2.5 rounded-r-md hover:bg-white/20 text-white'
          >
            Reply
          </button>
        </div>
      </form>
      <button 
        className='px-2'
        onClick={clearButtonClickHandler}
      >
        <MdAddCircle className='rotate-45 text-slate-500 hover:text-white h-5 w-5'/>
      </button>
    </div>
  )
}