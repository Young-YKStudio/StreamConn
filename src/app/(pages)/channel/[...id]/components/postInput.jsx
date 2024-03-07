'use client'

import { MdOutlineAddCircle } from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'

const PostInput = ({isReplyActive, setIsReplyActive}) => {

  const [ inputtedText, setInputtedText ] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    // api call
    let sendingData = {
      input: inputtedText
    }
    try {
      const respose = await axios.post('/api/createPost', sendingData)
      if(respose) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error, 'at api call')
    }
  }

  return (
    <form className='flex flex-row flex-nowrap m-4 items-center bg-white/20 p-2 rounded-md text-xs' onSubmit={submitHandler}>
      <div className='mr-2'>
        <MdOutlineAddCircle className='w-5 h-5'/>
      </div>
      {isReplyActive ?
        <input type='text' placeholder='REPLY' value={inputtedText} onChange={(e) => setInputtedText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/>
      :
        <input type='text' placeholder='POSTING' value={inputtedText} onChange={(e) => setInputtedText(e.target.value)} className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'/>
      } 
      <button type='submit'>submit</button>
    </form>
  );
}
export default PostInput;