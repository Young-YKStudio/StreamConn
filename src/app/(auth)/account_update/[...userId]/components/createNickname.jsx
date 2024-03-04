'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import { useState } from 'react'
import axios from 'axios'

const CreateNickname = ({user, setCurrentPage}) => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ message, setMessage ] = useState()

  const focusHandler = (e) => {
    setMessage()
  }

  const submitBtnHandler = async (e) => {    
    // validate
    if(inputtedText === '') {
      console.log('no inputted text')
      return
    }

    if(inputtedText.length > 16) {
      setMessage('Nickname cannot be more than 16 characters')
      return
    }

    // api call
    let sendingData = {
      nickname: inputtedText
    }

    try {
      const response = await axios.put(`/api/updateNickname/${user.user._id}`, sendingData)
      if(response.status === 200) {
        setCurrentPage('addFollows')
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-20"
    >
      <div className='w-1/3 flex flex-col justify-center items-center gap-6'>
        <div className='flex flex-col items-center gap-6'>
          <p className="text-3xl">Create your nickname</p>
        </div>
        <div className='mt-2 flex flex-col items-center w-full gap-4'>
          <input 
            type='text'
            value={inputtedText}
            name='nickname'
            className='block w-full rounded-md border-0 py-1.5 ring-inset ring-sky-500 focus:ring-sky-500 text-gray-900'
            onChange={(e) => setInputtedText(e.target.value)}
            onFocus={focusHandler}
            placeholder='Nickname'
          />
          {message && <p className='text-red-500'>{message}</p>}
        </div>
        <button
          className={bluebuttonDark + ' mt-2'}
          onClick={submitBtnHandler}
        >
          Next
        </button>
      </div>
    </motion.section>
  );
}
export default CreateNickname;