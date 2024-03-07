'use client'

import { motion } from 'framer-motion'
import { blueButtonDarkOutlined, bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import axios from 'axios';
import { useState } from 'react'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaTwitch, FaYoutube } from "react-icons/fa";
import { chzzkLogo } from '@/app/data/logoLinks';
import Image from 'next/image';
import afreecaImage  from '../../../../../images/afreecaTV_logo_rgb_light_symbol.png'
import kickImage from '../../../../../images/Kick-logo-green-k.png'
import { useRouter } from 'next/navigation'

const AddFollows = ({user, setCurrentPage, allStreamers}) => {

  const [ searchField, setSearchField ] = useState('')
  const [ matchedStreamers, setMatchedStreamers ] = useState([])
  const [ favoritedStreamers, setFavoritedStreamers ] = useState([])

  const router = useRouter()

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

  const addFavoriteBtnHandler = (e, id) => {
    let duplicate = favoritedStreamers.find(streamer => streamer.id === id)
    if(duplicate) {
      return
    } else {
      setFavoritedStreamers((prev) => [...prev, id])
    }
  }

  const removeFavoriteBtnHandler = (e, id) => {
    setFavoritedStreamers(favoritedStreamers.filter(streamer => streamer !== id))
  }

  const foundStreamersDistributor = (streamer) => {

    let foundStreamer = favoritedStreamers.find(favoritedStreamer => favoritedStreamer === streamer._id)
    
    if (foundStreamer) {
      return <button onClick={e => removeFavoriteBtnHandler(e, streamer._id)} className='flex flex-row px-2 border border-sky-800 items-center text-sky-800 py-1 gap-2 rounded-md text-sm'><MdFavorite className='w-5 h-5 text-sky-500' />followed</button>
    } else {
      return <button onClick={e => addFavoriteBtnHandler(e, streamer._id)} className='flex flex-row px-2 border border-sky-800 bg-sky-800 items-center text-white py-1 gap-2 rounded-md text-sm'><MdFavoriteBorder className='w-5 h-5 text-sky-500' />follow</button>
    }
  }

  const platformIconsDistributor = (platform) => {

    if(platform.name === 'Twitch') {
      return <FaTwitch className='w-5 h-5 text-purple-600' />
    }
    if(platform.name === 'YouTube') {
      return <FaYoutube className='w-5 h-5 text-red-600' />
    }
    if(platform.name === 'Chzzk') {
      return <img src={chzzkLogo} className='w-5 h-5 rounded-full'/>
    }
    if(platform.name === 'Afreeca') {
      return <Image src={afreecaImage} className='w-5 h-5' />
    }
    if(platform.name === 'KICK') {
      return <Image src={kickImage} className='w-5 h-5' />
    }
  }

  const submitHandler = (e, type) => {
    e.preventDefault()

    let skippedUser = async () => {
      try {
        let response = await axios.put(`/api/updateFavSkip/${user._id}`)
        if(response.status == 200) {
          router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }

    let favAddedUser = async () => {
      let sendingData = {
        follows: favoritedStreamers
      }

      try {
        let response = await axios.put(`/api/updateFavUser/${user._id}`, sendingData)

        if(response.status == 200) {
          router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }

    if(type === 'skip') {
      return skippedUser()
    }
    if(type === 'favAdded') {
      if(favoritedStreamers.length > 0) {
        return favAddedUser()
      } else {
        return skippedUser()
      }
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
          <p className="text-3xl">Add your favorite streamers</p>
        </div>
        <div className='mt-2 flex flex-col items-center w-full gap-4'>
          <input 
            type='text'
            name='nickname'
            className='block w-full rounded-md border-0 py-1.5 ring-inset ring-sky-500 focus:ring-sky-500 text-gray-900'
            value={searchField}
            onChange={changeHandler}
            placeholder='Nickname'
          />
          {/* foundSearch */}
          {matchedStreamers.length > 0 &&
            <div
              className='bg-white rounded-md w-full text-gray-900 p-4 flex flex-col gap-2 max-h-1/2'
            >
              <p className='text-xs font-bold tracking-wider'>found streamers</p>
              {matchedStreamers.map((streamer) => (
                <div
                  key={streamer._id + 'foundSearch'}
                  className='flex flex-row flex-nowrap justify-between border-y border-gray-400 py-2'
                >
                  <div className='flex flex-row flex-nowrap gap-2'>
                    {/* profile image */}
                    <div>
                      <img src={streamer.profile} className='w-12 h-12 rounded-full'/>
                    </div>

                    {/* nickname */}
                    <div className='flex flex-col justify-center'>
                      <p className='font-bold text-lg'>{streamer.nickname}</p>
                      <div className='text-xs flex flex-row gap-2 items-center'>
                        <p className='tracking-wide'>{streamer.followers.length} followers</p>
                        <div className='flex flex-row flex-nowrap gap-1'>
                          {streamer.platforms.length > 0 && streamer.platforms.map((platform) => (
                            <div
                              key={platform._id}
                            >
                              {platformIconsDistributor(platform)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* add platform icons */}

                  {/* follow button */}
                  <div className='flex items-center'>
                    {foundStreamersDistributor(streamer)}
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        <div className='flex flex-row items-center gap-4'>
          <button
            className={bluebuttonDark + ' mt-2'}
            onClick={(e) => submitHandler(e, 'favAdded')}
            >
            Finish
          </button>
          <button
            className={blueButtonDarkOutlined + ' mt-2'}
            onClick={(e) => submitHandler(e, 'skip')}
            >
            Skip
          </button>

        </div>

      </div>

      {/* display streamers (featured streamers, paid streamer display first)*/}
      {/* <div className='w-full px-8'>
        <p>Featured Stremaers</p>
        {allStreamers && allStreamers.map((streamer) => (
          <div key={streamer._id}>
            <p>{streamer.nickname}</p>
          </div>
        ))}
      </div> */}
    </motion.section>  
  );
}
export default AddFollows;