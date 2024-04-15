'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse, setForceAuthUpdate } from '@/redux/slice';
import StreamerCards from './streamerCards';
import { updateIsUpdated } from '@/redux/service/authWelcomeService';

const AddFollowsRender = ({allStreamers}) => {

  const [ searchField, setSearchField ] = useState('')
  const [ matchedStreamers, setMatchedStreamers ] = useState([])

  const loggedUser = useSelector((state) => state.redux.auth)

  const router = useRouter()
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    setSearchField(e.target.value)
    let teamArry = []

    if(e.target.value.length > 0) {
      allStreamers.forEach(streamer => {
        if(streamer.nickname.toLowerCase().includes(e.target.value.toLowerCase())) {
          teamArry.push(streamer)
        }
      })
  
      setMatchedStreamers(teamArry)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if(loggedUser.isStreamer) {
      // route to the next step
      return router.push('/account_update/platforms')
    }

    dispatch(setIsLoadingTrue())

    let finishRequest = {
      userId: loggedUser._id,
    }

    let finishSettingRequest = await updateIsUpdated(finishRequest)

    if(finishSettingRequest) {
      dispatch(setIsLoadingFalse())
      dispatch(setForceAuthUpdate())
      return router.push('/')
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
      <div className='min-w-sm flex flex-col justify-center items-center gap-6'>
        <div className='flex flex-col items-center gap-6'>
          <p className="text-3xl">Follow your favorite streamers</p>
        </div>
        <div className='mt-2 flex flex-col items-center w-full gap-2'>
          <input 
            type='text'
            name='nickname'
            className='block w-full rounded-md border-0 py-1.5 ring-inset ring-sky-500 focus:ring-sky-500 text-gray-900 max-w-xs'
            value={searchField}
            onChange={changeHandler}
            placeholder='search and follow'
          />
          {/* foundSearch */}
          {matchedStreamers.length > 0 && 
            <motion.div 
              className='bg-sky-700 w-full max-w-xs rounded-md shadow-md px-4 py-2'
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.2}}
            >
              <p className='block text-sm font-semibold border-b border-white/40 border-0.5 pb-1 mt-2'>Found Streamers</p>

              <div className='flex flex-col pb-2 max-h-64 divide-y divide-white/40 gap-1'>
                {matchedStreamers.map((streamer) => (
                  <div key={streamer._id + ' streamerCards'}>
                    <StreamerCards loggedUser={loggedUser} streamer={streamer}  />
                  </div>
                ))}
              </div>
            </motion.div>  
          }
        </div>

        <div className='flex flex-row items-center gap-4'>
          <button
            className={bluebuttonDark + ' mt-2'}
            onClick={submitHandler}
            >
            Next
          </button>
        </div>

      </div>

      {/* display streamers (featured streamers, paid streamer display first)*/}

    </motion.section>  
  );
}
export default AddFollowsRender;