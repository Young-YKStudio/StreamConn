'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '@/app/util/SocketProvider'
import { PostLists } from './components/postLists'

const TextRenderSocket = ({channel}) => {

  const [posts, setPosts ] = useState()
  const [ inputText, setInputText ] = useState('')

  const loggedUser = useSelector((state) => state.redux.auth)
  const { socket } = useSocket()



  useEffect(() => {
    console.log(channel._id)
    socket?.emit('getPosts', channel._id)
    socket?.on('getPostsReturn', (channelData) => {
      setPosts(channelData.posts)
    })
  }, [socket, channel])
  
  return (
    <div className='w-full flex flex-col justify-between h-full'>
      {/* posts */}
      <div>
        <p>post area</p>
        {posts && <PostLists lists={posts}/>}
      </div>
      {/* input box */}
      <form>
        <input type='text' />
      </form>
    </div>
  )
}

export default TextRenderSocket;