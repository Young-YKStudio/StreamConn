'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '@/app/util/SocketProvider'
import { PostLists } from './components/postLists'
import TextareaAutosize from 'react-textarea-autosize'
import { InputPost } from './components/inputs/inputPost'

const TextRenderSocket = ({channel}) => {

  const [ posts, setPosts ] = useState()
  const [ inputType, setInputType ] = useState('post')
  const [ replyId, setReplyId ] = useState()
  const [ inputText, setInputText ] = useState('')

  const loggedUser = useSelector((state) => state.redux.auth)
  const { socket } = useSocket()

  useEffect(() => {
    socket?.emit('getPosts', channel._id)
    socket?.on('getPostsReturn', (channelData) => {
      setPosts(channelData)
    })
  }, [socket])

  const inputBoxDistributor = (state) => {
    switch(state) {
      case 'post':
        return <InputPost inputText={inputText} setInputText={setInputText} loggedUser={loggedUser} channel={channel} />
      case'edit':
        return replyPostHandler
      default:
        return <InputPost inputText={inputText} setInputText={setInputText} loggedUser={loggedUser} channel={channel} />
    }
  }
  
  return (
    <div className='w-full flex flex-col justify-between items-center h-full max-w-screen-xs md:max-w-screen-md pb-2 px-4'>
      {/* input box */}
      {inputBoxDistributor(inputType)}
      {/* posts */}
      <div className='w-full'>
        {posts && <PostLists lists={posts} loggedUser={loggedUser} replyId={replyId} setReplyId={setReplyId} channel={channel._id} />}
      </div>
    </div>
  )
}

export default TextRenderSocket;