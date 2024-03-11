'use client'

import axios from 'axios'
import { MdOutlineAddCircle } from 'react-icons/md'
import { useState, useEffect } from 'react'

const PostInput = ({mode, setMode, returnedPosts, isReplyActive, setIsReplyActive, selectedPost, setSelectedPost, inputtedText, setInputtedText, isEditActive, setIsEditActive}) => {
  
  const submitHandler = async (e) => {
    e.preventDefault()
    if (inputtedText == '') {
      return
    }

    let id

    if (selectedPost) {
      id = selectedPost._id
    }
    
    // api call
    if (mode == 'new') {
      let sendingNewPostData = {
        input: inputtedText
      } 
  
      try {
        const response = await axios.post('/api/createPost', sendingNewPostData)
        if (response) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error, 'at api new call')
      }
    } else if (mode == 'reply') {
      let sendingCommentData = {
        id: id,
        input: inputtedText
      }
      try {
        const response = await axios.post('/api/addComment', sendingCommentData)
        if (response) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error, 'at api reply call')
      }
    } else if (mode == 'edit') {
      try {
        let sendingUpdatedPostData = {
          id: selectedPost._id,
          input: inputtedText
        } 
        const response = await axios.put('/api/editPost', sendingUpdatedPostData)
        if(response.status === 200) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error, 'at api edit call')
      }
    } else {
      console.log('Future error handling in api mode call')
    }
  }

  const cancelHandler = (e) => {
    e.preventDefault()
    setInputtedText('')
    setIsReplyActive(false)
  }

  const operationHandler = () => {
    if (mode == 'reply' && isReplyActive && selectedPost) {
      return ( <input type='text' placeholder={'Reply to ' + selectedPost.body} value={inputtedText} onChange={(e) => setInputtedText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } else if (mode == 'edit' && isEditActive && selectedPost) {
      return ( <input type='text' value={inputtedText} onChange={(e) => setInputtedText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } else {
      return ( <input type='text' placeholder='New message' value={inputtedText} onChange={(e) => setInputtedText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    }
  }

  return (
    <form className='flex flex-row flex-nowrap m-4 items-center bg-white/20 p-2 rounded-md text-xs' onSubmit={submitHandler}>
      <div className='mr-2'>
        <MdOutlineAddCircle className='w-5 h-5'/>
      </div>
      {operationHandler()}
      <div className='flex flex-row gap-2'>
        <button type='submit' className='rounded-md bg-blue-400 hover:bg-red-700'>submit</button>
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => cancelHandler(e)}>cancel</button>
      </div>
    </form>
  )
}
export default PostInput;