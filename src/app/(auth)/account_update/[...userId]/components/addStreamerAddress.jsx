'use client'

import { motion } from 'framer-motion'
import { MdCheck } from "react-icons/md";
import { bluebuttonDark, blueButtonDarkOutlined } from '@/app/components/buttons/buttonStyles'
import axios from 'axios'

const AddStreamerAddress = ({user, platforms, setPlatforms, setCurrentPage}) => {

  const inputBoxStyles = 'block w-full rounded-l-md border-0 py-1.5 shadow-sm ring-inset ring-sky-800 focus:ring-inset focus:ring-sky500 text-gray-900'
  const inputBoxDisabledStyles = 'block w-full rounded-l-md border-0 py-1.5 shadow-sm ring-inset ring-sky-800 focus:ring-inset focus:ring-sky500 text-gray-900 bg-gray-400'

  const changeHandler = (e, index) => {
    setPlatforms(platforms.map((platform, i) => {
      if(i === index) {
        return {...platform, href: e.target.value}
      } else {
        return platform
      }
    }))
  }

  const checkStreamingAddress = (e, checkingPlatform) => {

    // validations

    if(checkingPlatform.href === '') {
      console.log('no href entered')
      return
    }

    if(checkingPlatform.name == 'Twtich') {
      if(!checkingPlatform.href.startsWith('https://www.twitch.tv/')) {
        return console.log('invalid url twtich')
      }
    }

    if(checkingPlatform.name == 'YouTube') {
      if(!checkingPlatform.href.startsWith('https://www.youtube.com/@')) {
        return console.log('invalid url youtube')
      }
    }

    if(checkingPlatform.name == 'Chzzk') {
      if(!checkingPlatform.href.startsWith('https://chzzk.naver.com/')) {
        return console.log('invalid url chzzk')
      }
    }

    if(checkingPlatform.name == 'Afreeca') {
      if(!checkingPlatform.href.startsWith('https://bj.afreecatv.com/')) {
        return console.log('invalid url afreeca')
      }
    }

    if(checkingPlatform.name == 'KICK') {
      if(!checkingPlatform.href.startsWith('https://kick.com/')) {
        return console.log('invalid url kick')
      }
    }


    // call API check streaming address

    // const checkStreamingAddressUrl = async () => {
    //   try {
    //     const res = await axios.get(`${platform.href}`)
    //     if(res.status === 200) {
    //       console.log(res.data)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // checkStreamingAddressUrl()

    // if checking returns okay, update state
    setPlatforms(platforms.map((platform) => {
      if(platform.name === checkingPlatform.name) {
        return {...platform, href: checkingPlatform.href, hrefChecked: true}
      } else {
        return platform
      }
    }))
  }

  const nextBtnHandler = (e) => {
    e.preventDefault()

    const requestToAPI = async () => {
      try {
        const res = await axios.post(`/api/addPlatformAddress/${user.user._id}`, platforms)
        if(res.status === 200) {
          setCurrentPage('streamerIntro')
        }
      } catch (error) {
        console.log(error)
      }
    }

    requestToAPI()
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
        <div className='flex flex-col justify-center gap-6 w-full'>
          {platforms && platforms.map((platform, i) => {
            if(platform.checked) {
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
                      className={platform.hrefChecked ? inputBoxDisabledStyles : inputBoxStyles} 
                      disabled={platform.hrefChecked ? true : false} 
                      onChange={(e) => changeHandler(e, i)}
                    />
                    {platform.hrefChecked ? 
                      <div className='bg-green-600 rounded-r-md border border-1 border-green-600 px-6 py-2'><MdCheck className='w-5 h-5'/></div>
                      :
                      <button onClick={(e) => checkStreamingAddress(e, platform)} className='px-4 py-2 text-sm bg-sky-800 rounded-r-md border border-1 border-sky-800 hover:bg-sky-500'>Check</button>
                    }
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>ex) {exampleTextDistributor(platform.name)}<span className='font-bold italic'>Your ID</span></p>
                </div>
              )
            }}
          )}
          <button className={bluebuttonDark} onClick={nextBtnHandler}>Next</button>
        </div>
      </div>
    </motion.section>
  );
}
export default AddStreamerAddress;