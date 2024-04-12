'use client'

import { motion } from 'framer-motion'
import { blueButtonDarkOutlined, bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice';
import StreamerCards from './streamerCards';

const AddFollowsRender = () => {

  const [ searchField, setSearchField ] = useState('')
  const [ matchedStreamers, setMatchedStreamers ] = useState([])
  const [ favoritedStreamers, setFavoritedStreamers ] = useState([])

  const loggedUser = useSelector((state) => state.redux.auth)
  const allStreamers = useSelector((state) => state.redux.allStreamers)

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
              <p className='block text-sm font-semibold border-b border-white/40 border-0.5 pb-1'>Found Streamers</p>

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
            onClick={(e) => submitHandler(e, 'favAdded')}
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