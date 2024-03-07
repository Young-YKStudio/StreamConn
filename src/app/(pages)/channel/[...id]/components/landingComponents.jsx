'use client'

import { useState, useEffect } from 'react'
import PostInput from './postInput'
import RenderingPosts from './posts'

const LandingComponents = ({returnedPosts}) => {

  const [ allPosts, setAllPosts] = useState([])
  const [ isReplyActive, setIsReplyActive ] = useState(false)

  useEffect(() => {
    setAllPosts(returnedPosts)
  },[])

  return (
    <div>
      <RenderingPosts isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} returnedPosts={allPosts} />
      <PostInput isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} />
    </div>
  );
}
export default LandingComponents;