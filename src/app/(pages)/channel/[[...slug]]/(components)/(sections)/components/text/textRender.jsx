'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { useRouter, redirect } from 'next/navigation'
import { MdOutlineAddCircle } from 'react-icons/md'

const TextRender = ({channel}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.redux.auth)

  const [ allPosts, setAllPosts ] = useState([])
  const [ mode, setMode ] = useState('addPost')
  const [ selectedPost, setSelectedPost ] = useState({})
  const [ isReplyPostActive, setIsReplyPostActive ] = useState(false)
  const [ isEditPostActive, setIsEditPostActive ] = useState(false)
  const [ selectedComment, setSelectedComment ] = useState({})
  const [ isEditCommentActive, setIsEditCommentActive ] = useState(false)
  const [ inputText, setInputText ] = useState('')

  useEffect(() => {
    setAllPosts(channel.posts)
  }, [])

  const replyPostHandler = (e, postId) => {
    let foundPost

    if (selectedPost == undefined) {
      foundPost = channel.posts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('replyPost')
        setSelectedPost(foundPost)
        setIsReplyPostActive(true)
      }    
    } else if (selectedPost._id == postId) {
      if (isReplyPostActive) {
        setMode('addPost')
        setSelectedPost({})
      } else {
        setMode('replyPost')
      }
      setIsReplyPostActive(!isReplyPostActive)

    } else {
      foundPost = channel.posts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('replyPost')
        setSelectedPost(foundPost)
        setIsReplyPostActive(true)
      }      
    }

    setIsEditPostActive(false)
    setSelectedComment({})
    setIsEditCommentActive(false)
    setInputText('')
  }

  const editPostHandler = (e, postId) => {
    let foundPost

    if (selectedPost == undefined) {
      foundPost = channel.posts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('editPost')
        setSelectedPost(foundPost)
        setIsEditPostActive(true)
        setInputText(foundPost.body)
      } 
    } else if (selectedPost._id == postId) {
      if (isEditPostActive) {
        setMode('addPost')
        setSelectedPost({})
        setIsEditPostActive(false)
        setInputText('')
      } else {
        setMode('editPost')
        setIsEditPostActive(true)
        setInputText(selectedPost.body)
      }
    } else {
      let foundPost = channel.posts.find(({ _id }) => _id == postId)
      if (foundPost) {
        setMode('editPost')
        setSelectedPost(foundPost)
        setIsEditPostActive(true)
        setInputText(foundPost.body)
      }
    }

    setIsReplyPostActive(false)
    setSelectedComment({})
    setIsEditCommentActive(false)
  }

  const deletePostHandler = async (e, channelId, postId) => {
    dispatch(setIsLoadingTrue())

    let data = { 
      channelId: channelId,
      postId: postId, 
    }

    const requestToDelete = async () => {
      const response = await axios.put('/api/deletePost', data)
      if (response.status === 200) {
        setMode('addPost')
        setAllPosts(response.data)
        setSelectedPost({})
        setIsReplyPostActive(false)
        setIsEditPostActive(false)
        setSelectedComment({})
        setIsEditCommentActive(false)
        setInputText('')
        dispatch(setIsLoadingFalse())
        return router.refresh()
      }
    }
    requestToDelete()
    dispatch(setIsLoadingFalse())
  }

  const editCommentHandler = (e, postId, commentId) => {
    let foundComment

    if (selectedComment == undefined) {
      channel.posts.map((post) => { 
        post.comments.map((comment) => {
          if (comment._id == commentId) {
            setMode('editComment')
            setSelectedComment(comment)
            setIsEditCommentActive(true)
            setInputText(comment.body)
          }
        })
      })
    } else if (selectedComment._id == commentId) {
      if (isEditCommentActive) {
        setMode('addPost')
        setSelectedComment({})
        setIsEditCommentActive(false)
        setInputText('')
      } else {
        setMode('editComment')
        setIsEditCommentActive(true)
        setInputText(selectedComment.body)
      }
    } else {
      channel.posts.map((post) => {
        post.comments.map((comment) => {
          if (comment._id == commentId) {
            setMode('editComment')
            setSelectedComment(comment)
            setIsEditCommentActive(true)
            setInputText(comment.body)
          }
        })
      })
    }

    setSelectedPost({})
    setIsReplyPostActive(false)
    setIsEditPostActive(false)
  }

  const deleteCommentHandler = async (e, postId, commentId) => {
    dispatch(setIsLoadingTrue())

    let data = { 
      postId: postId, 
      commentId: commentId,
    }

    const requestToDelete = async () => {
      const response = await axios.put('/api/deleteComment', data)
      if (response.status === 200) {
        setMode('addPost')
        setAllPosts(response.data)
        setSelectedPost({})
        setIsReplyPostActive(false)
        setIsEditPostActive(false)
        setSelectedComment({})
        setIsEditCommentActive(false)
        setInputText('')
        dispatch(setIsLoadingFalse())
        return router.refresh()
      }
    }
    requestToDelete()
    dispatch(setIsLoadingFalse())
  }

  const submitHandler = async () => {
    dispatch(setIsLoadingTrue())

    if (inputText == '') {
      dispatch(setIsLoadingFalse())
      return
    }

    if (mode == 'addPost') {
      let addPostData = { 
        input: inputText, 
        channelId: channel._id,
        postOwner: loggedUser._id,
      } 

      try {
        const response = await axios.post('/api/addPost', addPostData)
        if (response.status === 200) {
          setMode('addPost')
          setAllPosts(response.data)
          setSelectedPost({})
          setIsReplyPostActive(false)
          setIsEditPostActive(false)
          setSelectedComment({})
          setIsEditCommentActive(false)
          setInputText('')
          dispatch(setIsLoadingFalse())
          return router.refresh()
        }
      } catch (error) {
        console.log(error, 'at api addPost call')
      }
      dispatch(setIsLoadingFalse())
    } else if (mode == 'replyPost') {
      let addCommentData = { 
        postId: selectedPost._id,
        input: inputText,
        commentOwner: loggedUser._id,
      }

      try {
        const response = await axios.post('/api/addComment', addCommentData)
        if (response.status === 200) {
          setMode('addPost')
          setAllPosts(response.data)
          setSelectedPost({})
          setIsReplyPostActive(false)
          setIsEditPostActive(false)
          setSelectedComment({})
          setIsEditCommentActive(false)
          setInputText('')
          dispatch(setIsLoadingFalse())
          return router.refresh()
        }
      } catch (error) {
        console.log(error, 'at api addComment call')
      }
      dispatch(setIsLoadingFalse())
    } else if (mode == 'editPost') {
      let editPostData = {
        postId: selectedPost._id,
        input: inputText,
        userId: loggedUser._id,
      } 

      try {
        const response = await axios.put('/api/editPost', editPostData)
        if ( response.status === 200) {
          setMode('addPost')
          setAllPosts(response.data)
          setSelectedPost({})
          setIsReplyPostActive(false)
          setIsEditPostActive(false)
          setSelectedComment({})
          setIsEditCommentActive(false)
          setInputText('')
          dispatch(setIsLoadingFalse())
          return router.refresh()
        }
      } catch (error) {
        console.log(error, 'at api editPost call')
      }
      dispatch(setIsLoadingFalse())
    } else if (mode == 'editComment') {
      let editCommentData = {
        commentId: selectedComment._id,
        input: inputText,
        userId: loggedUser._id,
      }

      try {
        const response = await axios.put('/api/editComment', editCommentData)
        if (response.status === 200) {
          setMode('addPost')
          setAllPosts(response.data)
          setSelectedPost({})
          setIsReplyPostActive(false)
          setIsEditPostActive(false)
          setSelectedComment({})
          setIsEditCommentActive(false)
          setInputText('')
          dispatch(setIsLoadingFalse())
          return router.refresh()
        }
      } catch (error) {
        console.log(error, 'at api editComment call')
      }
      dispatch(setIsLoadingFalse())
    } else {
      console.log('Future error handling in api mode call')
    }
    dispatch(setIsLoadingFalse())
  }

  const cancelHandler = () => {
    setMode('addPost')
    setSelectedPost({})
    setIsReplyPostActive(false)
    setIsEditPostActive(false)
    setSelectedComment({})
    setIsEditCommentActive(false)
    setInputText('')
  }

  const operationHandler = () => {
    if (mode == 'replyPost' && isReplyPostActive && selectedPost ) {
      return ( <input type='text' placeholder={'Reply to ' + selectedPost.body} value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } else if (mode == 'editPost' && isEditPostActive && selectedPost) {
      return ( <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } else if (mode == 'editComment' && isEditCommentActive && selectedComment) {
      return ( <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    } else {
      return ( <input type='text' placeholder='New message' value={inputText} onChange={(e) => setInputText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/> )
    }
  }

  return (
    <div className='w-full p-5 flex flex-col'>
      <div>
        { channel && channel.posts.map((post) => {
          return (
            <div key={post._id}>
              <div className='flex flex-row'>
                <div className='w-full flex gap-3'>
                  {post.body}
                  { loggedUser ? 
                      <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => replyPostHandler(e, post._id) }>Reply</button>
                    :
                      <></>
                  }
                  { (loggedUser && ((post.postOwner._id == loggedUser._id))) ?
                      <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => editPostHandler(e, post._id) }>Edit</button>
                    :
                      <></>
                  }
                  { (loggedUser && ((post.postOwner._id == loggedUser._id) || (channel.channelOwner == loggedUser._id))) ?
                      <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => deletePostHandler(e, channel._id, post._id) }>Delete</button>
                    :
                      <></>
                  }
                </div>
                <div className='flex justify-end'>
                  {post.postOwner.nickname}
                </div>
              </div>
              <div>
                { post && post.comments.map((comment) => (
                  <div key={comment._id} className='bg-white text-slate-900 w-full'>
                    <div className="flex flex-row">
                      <div className='w-full flex gap-3'>
                        {comment.body}
                        { (loggedUser && ((comment.commentOwner._id == loggedUser._id))) ?
                            <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => editCommentHandler(e, post._id, comment._id) }>Edit</button>
                          :
                            <></>
                        }
                        { (loggedUser && ((comment.commentOwner._id == loggedUser._id) || (channel.channelOwner == loggedUser._id))) ?
                            <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={ (e) => deleteCommentHandler(e, post._id, comment._id) }>Delete</button>
                          :
                            <></>
                        }
                      </div>
                      <div className='flex justify-end'>
                        {comment.commentOwner.nickname}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div>
        { loggedUser ?
            <div className='flex flex-row flex-nowrap m-4 items-center bg-white/20 p-2 rounded-md text-xs'>
              <div className='mr-2'>
                <MdOutlineAddCircle className='w-5 h-5'/>
              </div>
              {operationHandler()}
              <div className='flex flex-row gap-2'>
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => submitHandler(e)}>Submit</button>
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => cancelHandler(e)}>Cancel</button>
              </div>
            </div>
          :
            <></>
        }
      </div>
    </div>
  )
}
export default TextRender;

// api call 리덕스쪽에 옮겨주시고 error handling 유저한테 보여주는거 만들어 주세요.
// 그 외에는 코드 맘에 듭니다. 아주 잘하셨어요.