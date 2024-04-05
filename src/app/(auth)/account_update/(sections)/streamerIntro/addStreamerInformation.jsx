'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import { useSelector, useDispatch } from 'react-redux'
import { updateStreamerIntro } from '@/redux/service/authWelcomeService';
import { setIsLoadingFalse, setIsLoadingTrue } from '@/redux/slice';

const AddStreamerInformation = () => {

  const [ inputtedText, setInputtedText ] = useState('')

  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.redux.auth)

  const nextBtnHandler = async (e) => {
    e.preventDefault()

    dispatch(setIsLoadingTrue())

    let sendingData = {
      id: loggedUser._id,
      input: inputtedText
    }

    let request = await updateStreamerIntro(sendingData)

    if(request) {
      dispatch(setIsLoadingFalse())
      console.log('success')
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
      <div className='sm:w-3/4 lg:w-1/2 flex flex-col items-center gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <p className="text-3xl">Tell your followers about you</p>
        </div>
        <div className='w-full'>
          <label htmlFor='intro' className='block text-sm font-medium leading6 text-gray-200'>Introduction<span className='pl-2 text-xs italic'>(Md format supported)</span></label>
          <div className='mt-2'>
            <textarea
              name='intro'
              id='intro'
              rows='4'
              value={inputtedText}
              onChange={(e) => setInputtedText(e.target.value)}
              className='shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900'
            />
          </div>
        </div>
        <button
          className={bluebuttonDark}
          onClick={nextBtnHandler}
        >
          Next
        </button>
      </div>
    </motion.section> 
  );
}
export default AddStreamerInformation;