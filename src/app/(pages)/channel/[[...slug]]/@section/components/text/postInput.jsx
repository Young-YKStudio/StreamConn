'use client'

import axios from 'axios'
import { MdOutlineAddCircle } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const PostInput = ({ 
  channelData,
  mode, setMode, 
  allPosts, setAllPosts, 
  selectedPost, setSelectedPost, 
  selectedComment, setSelectedComment, 
  isReplyActive, setIsReplyActive, 
  isEditActive, setIsEditActive,
  isCommentActive, setIsCommentActive,
  inputText, setInputText, 
}) => {

  const { data: session, status } = useSession()

  let userId
  if (status == 'authenticated') {
    userId = session.user.id
  } else {
    userId = channelData.channelOwner
    console.log('postInput - CHANGE USER LATER', userId)
  }
  
  const channelName = channelData.channelName
  const channelOwnerId = channelData.channelUser

  const submitHandler = async (e) => {
    e.preventDefault()
    if (inputText == '') {
      return
    }

    if (mode == 'new') {
      let addPostData = { 
        input: inputText, 
        userId: userId,
        channelName: channelName,
        channelOwnerId: userId,
      } 

      try {
        const response = await axios.post('/api/addPost', addPostData)
        if (response) {
          setMode('new')
          setAllPosts(response.data)
          setSelectedPost()
          setIsReplyActive(false)
          setIsEditActive(false)
          setInputText('')
        }
      } catch (error) {
        console.log(error, 'at api new call')
      }
    } 
    else if (mode == 'replyPost') {
      let addCommentData = { 
        postId: selectedPost._id,
        input: inputText,
        userId: userId,
      }

      try {
        const response = await axios.post('/api/addComment', addCommentData)
        if (response) {
          setMode('new')
          setAllPosts(response.data)
          setSelectedPost()
          setIsReplyActive(false)
          setIsEditActive(false)
          setInputText('')
        }
      } catch (error) {
        console.log(error, 'at api reply call')
      }
    } 
    else if (mode == 'editPost') {
      let editPostData = {
        postId: selectedPost._id,
        input: inputText,
        userId: userId,
      } 

      try {
        const response = await axios.put('/api/editPost', editPostData)
        if ( response.status === 200) {
          setMode('new')
          setAllPosts(response.data)
          setSelectedPost()
          setSelectedComment()
          setIsReplyActive(false)
          setIsEditActive(false)
          setInputText('')
        }
      } catch (error) {
        console.log(error, 'at api edit call')
      }
    } 
    else if (mode == 'editComment') {
      let editCommentData = {
        commentId: selectedComment._id,
        input: inputText,
        userId: userId,
      }

      try {
        const response = await axios.put('/api/editComment', editCommentData)
        if (response.status === 200) {
          setMode('new')
          setAllPosts(response.data)
          setSelectedPost()
          setSelectedComment()
          setIsReplyActive(false)
          setIsEditActive(false)
          setIsCommentActive(false)
          setInputText('')
        }
      } catch (error) {
        console.log(error, 'at api edit call')
      }
    } 
    else {
      console.log('Future error handling in api mode call')
    }
  }

  const cancelHandler = (e) => {
    e.preventDefault()
    setMode('new')
    setSelectedPost()
    setIsReplyActive(false)
    setIsEditActive(false)
    setInputText('')
  }

  const operationHandler = () => {
    if (mode == 'replyPost' && isReplyActive && selectedPost ) {
      return ( <input type='text' placeholder={'Reply to ' + selectedPost.body} value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } 
    else if (mode == 'editPost' && isEditActive && selectedPost) {
      return ( <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } 
    else if (mode == 'editComment' && isCommentActive && selectedComment) {
      return ( <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } 
    else {
      return ( <input type='text' placeholder='New message' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
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