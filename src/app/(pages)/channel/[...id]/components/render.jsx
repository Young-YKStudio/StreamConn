'use client'

import { useState, useEffect } from 'react'
import PostInput from './postInput'
import RenderingPosts from './posts'

const PostBoard = ({returnedPosts}) => {
  const [ mode, setMode ] = useState('new')
  const [ isReplyActive, setIsReplyActive ] = useState(false)
  const [ selectedPost, setSelectedPost ] = useState()
  const [ inputtedText, setInputtedText ] = useState('')
  const [ isEditActive, setIsEditActive ] = useState(false)
  const [ allPosts, setAllPosts ] = useState([])

  // useEffect => setState allPosts
  useEffect(() => {
    if(returnedPosts) {
      setAllPosts(returnedPosts)
    }
  },[])
    
  return (
    <div className='w-full'>
      <RenderingPosts mode={mode} setMode={setMode} returnedPosts={returnedPosts} isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} selectedPost={selectedPost} setSelectedPost={setSelectedPost} inputtedText={inputtedText} setInputtedText={setInputtedText} isEditActive={isEditActive} setIsEditActive={setIsEditActive} allPosts={allPosts} />
      <PostInput mode={mode} setMode={setMode} returnedPosts={returnedPosts} isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} selectedPost={selectedPost} setSelectedPost={setSelectedPost} inputtedText={inputtedText} setInputtedText={setInputtedText} isEditActive={isEditActive} setIsEditActive={setIsEditActive} allPosts={allPosts} setAllPosts={setAllPosts} />
    </div>
  )
}

export default PostBoard;