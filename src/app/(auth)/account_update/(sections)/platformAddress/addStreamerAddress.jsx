'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { setIsLoadingFalse, setIsLoadingTrue, setForceAuthUpdate } from '@/redux/slice'
import { updatePlatformAddress } from '@/redux/service/authWelcomeService'
import { useRouter } from 'next/navigation'

const AddStreamerAddress = () => {

  const inputBoxStyles = 'block w-full rounded-md border-0 py-1.5 shadow-sm ring-inset ring-sky-800 focus:ring-inset focus:ring-sky500 text-gray-900'

  const [ platformsState, setPlatformsState ] = useState()

  const loggedUser = useSelector((state) => state.redux.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if(loggedUser) {
      if(loggedUser.platforms) {
        setPlatformsState(loggedUser.platforms)
      }
    }
  },[loggedUser])


  const changeHandler = (e, index) => {
    setPlatformsState(platformsState.map((platform, i) => {
      if(i === index) {
        return {...platform, href: e.target.value}
      } else {
        return platform
      }
    }))
  }

  const nextBtnHandler = async (e) => {
    e.preventDefault()

    dispatch(setIsLoadingTrue())

    let sendingData = {
      updatingUser: loggedUser,
      platforms: platformsState
    }

    const updatePlatformAddressRequest = await updatePlatformAddress(sendingData)

    if(updatePlatformAddressRequest) {
      dispatch(setIsLoadingFalse())
      dispatch(setForceAuthUpdate())
      return router.push('/')
    }

    dispatch(setIsLoadingFalse())
  }

  const exampleTextDistributor = (name) => {
    if(name === 'Twitch') {
      return 'https://www.twitch.tv/'
    }
    if(name === 'YouTube') {
      return 'https://www.youtube.com/@'
    }
    if(name === 'Chzzk') {
      return 'https://chzzk.naver.com/'
    }
    if(name === 'Afreeca') {
      return 'https://bj.afreecatv.com/'
    }
    if(name === 'KICK') {
      return 'https://kick.com/'
    }
  }

  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-12"
    >
      <div className='w-96 flex flex-col justify-center items-center gap-8'>
        <div>
          <p className="text-2xl">Provide your streaming address</p>
        </div>
        <div className='flex flex-col justify-center gap-6 w-full max-w-xs'>
          {platformsState && platformsState.map((platform, i) => {
              return (
                <div
                  key={platform.name + i}
                >
                  <div>
                    <label htmlFor={platform.name} className='select-non font-medium'>{platform.name} address</label>
                  </div>
                  <div className='mt-2 flex flex-nowrap'>
                    <input 
                      type='url' 
                      value={platform.href} 
                      name={platform.name} 
                      className={inputBoxStyles} 
                      onChange={(e) => changeHandler(e, i)}
                    />
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>ex) {exampleTextDistributor(platform.name)}<span className='font-bold italic'>Your ID</span></p>
                </div>
              )
            }
          )}
          <button className={bluebuttonDark} onClick={nextBtnHandler}>Next</button>
        </div>
      </div>
    </motion.section>
  );
}
export default AddStreamerAddress;