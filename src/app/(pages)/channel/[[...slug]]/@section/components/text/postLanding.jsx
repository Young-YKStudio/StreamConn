'use client'

import { useState, useEffect } from 'react'
import PostRendering from './postRendering'
import PostInput from './postInput'

const PostLanding = ({channelData, initAllPosts}) => {
  const [ allPosts, setAllPosts ] = useState(initAllPosts)
  const [ selectedPost, setSelectedPost ] = useState()
  const [ selectedComment, setSelectedComment ] = useState()
  const [ mode, setMode ] = useState('new')
  const [ isReplyActive, setIsReplyActive ] = useState(false)
  const [ isEditActive, setIsEditActive ] = useState(false)
  const [ isCommentActive, setIsCommentActive ] = useState(false)
  const [ inputText, setInputText ] = useState('')

  useEffect(() => {
    setAllPosts(allPosts)
  },[])

  useEffect(() => {
    setSelectedPost(selectedPost)
  },[])

  return (
    <div className='w-full'>
      <PostRendering
        channelData={channelData}
        mode={mode} setMode={setMode} 
        allPosts={allPosts} setAllPosts={setAllPosts} 
        selectedPost={selectedPost} setSelectedPost={setSelectedPost} 
        selectedComment={selectedComment} setSelectedComment={setSelectedComment} 
        isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} 
        isEditActive={isEditActive} setIsEditActive={setIsEditActive} 
        isCommentActive={isCommentActive} setIsCommentActive={setIsCommentActive}
        inputText={inputText} setInputText={setInputText} 
      />
      <PostInput 
        channelData={channelData}
        mode={mode} setMode={setMode} 
        allPosts={allPosts} setAllPosts={setAllPosts}   
        selectedPost={selectedPost} setSelectedPost={setSelectedPost} 
        selectedComment={selectedComment} setSelectedComment={setSelectedComment} 
        isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} 
        isEditActive={isEditActive} setIsEditActive={setIsEditActive} 
        isCommentActive={isCommentActive} setIsCommentActive={setIsCommentActive}
        inputText={inputText} setInputText={setInputText} 
      />
    </div>
  )
}

export default PostLanding;