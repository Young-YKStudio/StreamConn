'use client'

import { useState, useEffect } from 'react'
import PostInput from './postInput'
import RenderingPosts from './posts'

const LandingComponents = ({returnedPosts}) => {

  const [ allPosts, setAllPosts] = useState([])
  const [ isReplyActive, setIsReplyActive ] = useState(false)
  const [ isEditActive, setIsEditActive ] = useState(false)

  // useEffect(() => {
  //   setAllPosts(returnedPosts)
  // },[])

  return (
    <div>
      <RenderingPosts 
        returnedPosts={allPosts} 
        isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} 
      />
      <PostInput 
        allPosts={allPosts} setAllPosts={setAllPosts} 
        isReplyActive={isReplyActive} setIsReplyActive={setIsReplyActive} 
      />
    </div>
  );
}
export default LandingComponents;