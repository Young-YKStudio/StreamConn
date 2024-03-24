'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'

const PostRendering = ({
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
    console.log('AUTHENTICATED!!!', userId)
  } else {
    userId = channelData.channelOwner
    console.log('postRendering - CHANGE USER LATER', userId)
  }

  const channelName = channelData.channelName
  const channelOwner = channelData.channelOwner

  let foundPost

  const replyPostHandler = (e, postId) => {
    if (selectedPost == undefined) {
      foundPost = allPosts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('replyPost')
        setSelectedPost(foundPost)
        setIsReplyActive(true)
      }     
    } else if (selectedPost.length == 0) {
      foundPost = allPosts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('replyPost')
        setSelectedPost(foundPost)
        setIsReplyActive(true)
      }     
    } else if (selectedPost._id == postId) {
      if (isReplyActive) {
        setMode('new')
        setIsReplyActive(false)
      } else {
        setMode('replyPost')
        setIsReplyActive(true)
        setInputText('')
      }
      setIsReplyActive(!isReplyActive)
    } else {
      foundPost = allPosts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('replyPost')
        setSelectedPost(foundPost)
        setIsReplyActive(true)
        setInputText('')
      }      
    }
    setIsEditActive(false)
  }

  const editPostHandler = (e, postId) => {
    if (selectedPost == undefined) {
      foundPost = allPosts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('editPost')
        setSelectedPost(foundPost)
        setIsEditActive(true)
        setInputText(foundPost.body)
      } 
    } else if (selectedPost.length == 0) {
      let foundPost = allPosts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('editPost')
        setSelectedPost(foundPost)
        setIsEditActive(true)
        setInputText(foundPost.body)
      }
    } else if (selectedPost._id == postId) {
      if (isEditActive) {
        setMode('new')
        setIsEditActive(false)
        setInputText('')
      } else {
        setMode('editPost')
        setIsEditActive(true)
        setInputText(selectedPost.body)
      }
    } else {
      let foundPost = allPosts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('editPost')
        setSelectedPost(foundPost)
        setIsEditActive(true)
        setInputText(foundPost.body)
      }
    }
    setIsReplyActive(false)
  }
  
  const deletePostHandler = (e, postId) => {
    let data = { 
      postId: postId, 
      userId: userId,
      channelName: channelName,
      channelOwner: channelOwner,
    }

    setMode('delete')
    setInputText('')
    setIsReplyActive(false)
    setIsEditActive(false)

    const requestToDelete = async () => {
      const response = await axios.put('/api/deletePost', data)
      if (response.status === 200) {
        setMode('new')
        setAllPosts(response.data)
        setSelectedPost()
        setIsReplyActive(false)
        setIsEditActive(false)
        setInputText('')
      }
    }
    requestToDelete()
  }

  const editCommentHandler = (e, postId, commentId) => {
    let foundComment

    if (selectedComment == undefined) {
      allPosts.map((post) => {
        post.comments.map((comment) => {
          if (comment._id == commentId) {
            setMode('editComment')
            setSelectedComment(comment)
            setIsCommentActive(true)
            setInputText(comment.body)
          }
        })
      })
    } else if (selectedComment.length == 0) {
      allPosts.map((post) => {
        post.comments.map((comment) => {
          if (comment._id == commentId) {
            setMode('editComment')
            setSelectedComment(comment)
            setIsCommentActive(true)
            setInputText(comment.body)
          }
        })
      })
    } else if (selectedComment._id == commentId) {
      if (isCommentActive) {
        setMode('new')
        setIsCommentActive(false)
        setInputText('')
      } else {
        setMode('editComment')
        setIsCommentActive(true)
        setInputText(selectedComment.body)
      }
    } else {
      allPosts.map((post) => {
        post.comments.map((comment) => {
          if (comment._id == commentId) {
            setMode('editComment')
            setSelectedComment(comment)
            setIsCommentActive(true)
            setInputText(comment.body)
          }
        })
      })
    }
    setSelectedPost()
    setIsReplyActive(false)
    setIsEditActive(false)
  }

  const deleteCommentHandler = (e, postId, commentId) => {
    let data = { 
      postId: postId, 
      commentId: commentId,
      userId: userId,
    }

    setMode('delete')
    setInputText('')
    setIsReplyActive(false)
    setIsEditActive(false)

    const requestToDelete = async () => {
      const response = await axios.put('/api/deleteComment', data)
      if (response.status === 200) {
        setMode('new')
        setAllPosts(response.data)
        setSelectedPost()
        setIsReplyActive(false)
        setIsEditActive(false)
        setInputText('')
      }
    }
    requestToDelete()
  }

  return (
    <section className='pt-24 pl-4'>
      { allPosts && allPosts.length > 0 && 
        <div className="flex flex-col gap-2">
          { allPosts.map((post) => {
            return <div key={post._id}>
              <p className="flex flex-row gap-3">{post.body}
              {/* ternary for replies */}
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => replyPostHandler(e, post._id) }>Reply</button>
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => editPostHandler(e, post._id) }>Edit</button>
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => deletePostHandler(e, post._id) }>Delete</button>
              </p>
              { post.comments.length > 0 && post.comments.map((comment) => (
                <div key={comment._id} className='bg-white text-slate-900' >
                  <p className="flex flex-row gap-3">{comment.body}
                    <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => editCommentHandler(e, post._id, comment._id) }>Edit</button>
                    <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => deleteCommentHandler(e, post._id, comment._id) }>Delete</button>
                  </p>
                </div>
              ))}
            </div>
          })}
        </div>
      }
    </section>
  );
}

export default PostRendering;