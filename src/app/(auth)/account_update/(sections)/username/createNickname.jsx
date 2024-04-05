'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'; 
import { updateUsername } from '@/redux/service/authWelcomeService';

const CreateNickname = () => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ message, setMessage ] = useState()

  const router = useRouter()
  const loggedUser = useSelector((state) => state.redux.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if(loggedUser) {
      if(loggedUser.nickname) {
        router.push('/account_update/addFollows')
      }
    }
  },[loggedUser])

  const focusHandler = (e) => {
    setMessage()
  }

  const submitBtnHandler = async (e) => {    

    let sendingData = {
      id: loggedUser._id,
      nickname: inputtedText
    }

    dispatch(setIsLoadingTrue())

    let update = await updateUsername(sendingData)
    if(update) {
      dispatch(setIsLoadingFalse())
      return router.push('/account_update/addFollows')
    }

    dispatch(setIsLoadingFalse())
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
          <p className="text-3xl">Create your username</p>
        </div>
        <div className='mt-2 flex flex-col items-center w-full gap-4'>
          <input 
            type='text'
            value={inputtedText}
            name='nickname'
            className='block w-full rounded-md border-0 py-1.5 ring-inset ring-sky-500 focus:ring-sky-500 text-gray-900'
            onChange={(e) => setInputtedText(e.target.value)}
            onFocus={focusHandler}
            placeholder='username'
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