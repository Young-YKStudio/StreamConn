'use client'

import { useSocket } from '@/app/util/SocketProvider'
import TextareaAutosize from 'react-textarea-autosize'

export const InputPost = ({inputText, setInputText, loggedUser, channel}) => {

  const { socket } = useSocket()

  const postSubmitHandler = async (e) => {
    e.preventDefault()

    if(!loggedUser) {
      // TODO: alert to login
      return
    }

    // block blank input
    let trimmedText = inputText.trim()

    if(trimmedText === '') {
      return
    }

    let sendingData = {
      loggedUser: loggedUser,
      body: inputText,
      channelId: channel._id
    }

    await socket.emit('createPost', sendingData)
    setInputText('')
  }

  return (
    <form className='my-2 sticky md:top-[4.5em] top-[7.75em] w-full bg-slate-500/70 rounded-md flex flex-row z-10 shadow-md backdrop-blur-md' onSubmit={postSubmitHandler}>
      <button className='px-4 bg-sky-400 rounded-l-md hover:bg-sky-800 text-white text-xl'>+</button>
      <TextareaAutosize
        rows={1}
        className='w-full bg-transparent focus:ring-0 ring-0 border-transparent focus:border-transparent text-sm text-white'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Wrtie a Markdown supported post here...'
      ></TextareaAutosize>
      <button className='px-6 bg-sky-400 rounded-r-md text-medium hover:bg-sky-800 text-white'>Post</button>
    </form>
  )
}