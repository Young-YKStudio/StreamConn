'use client'

import { useState } from 'react'
import PostInput from './postInput'
import RenderingPosts from './posts'

const PostBoard = ({returnedPosts}) => {
  const [ mode, setMode ] = useState('new')
  const [ isReplyActive, setIsReplyActive ] = useState(false)
  const [ selectedPost, setSelectedPost ] = useState()
  const [ inputtedText, setInputtedText ] = useState('')
  const [ isEditActive, setIsEditActive ] = useState(false)
    
  return (
    <div className='w-full'>
      <RenderingPosts mode={mode} setMode={setMode} returnedPosts={returnedPosts} isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} selectedPost={selectedPost} setSelectedPost={setSelectedPost} inputtedText={inputtedText} setInputtedText={setInputtedText} isEditActive={isEditActive} setIsEditActive={setIsEditActive} />
      <PostInput mode={mode} setMode={setMode} returnedPosts={returnedPosts} isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} selectedPost={selectedPost} setSelectedPost={setSelectedPost} inputtedText={inputtedText} setInputtedText={setInputtedText} isEditActive={isEditActive} setIsEditActive={setIsEditActive} />
    </div>
  )
}

export default PostBoard;