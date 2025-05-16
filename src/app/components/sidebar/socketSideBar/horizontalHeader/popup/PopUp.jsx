import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MdArrowForwardIos, MdHighlightOff } from "react-icons/md";

export const PopUp = () => {

  const [inputText, setInputText ] = useState('')

  // TODO: make search function loop here
  // useEffect(() => {
  //   return console.log(inputText)
  // },[inputText])
  

  const lists = [
    {
      title: 'Discover',
      href: '/discover'
    },
    {
      title: 'Favorites',
      href: '/favorites'
    },
    {
      title: 'Streamers',
      href: '/streamers'
    },
    {
      title: 'Events',
      href: '/event'
    },
    {
      title: 'Games',
      href: '/games'
    },
  ]

  const linkClickHandler = (e, href) => {
    console.log('link Clicked', href)
  }

  const listItemClickHandler = (e, item) => {
    console.log('list Item Clicked', item)
  }

  const searchBoxStyle = (state) => {
    if(state === '') {
      return 'w-full rounded-md border-none text-zinc-700 focus:ring-0'
    }
    return 'w-full rounded-l-md border-none text-zinc-700 focus:ring-0'
  }

  const textResetStyle = (state) => {
    if(state === '') {
      return 'hidden'
    }
    return 'rounded-r-md bg-white text-zinc-700 pr-3'
  }

  return (
    <motion.div
      className="w-full h-[85vh] absolute top-[3.25rem] flex flex-col bg-sky-400 p-4 rounded-b-md z-30"
      initial={{ opacity: 0, y: -10, zIndex: 0 }}
      animate={{ opacity: 1, y: 0, zIndex: 30 }}
      transition={{ duration: 0.0125, type: 'spring', damping: 25, stiffness: 300}}
    >
      <div className="w-full flex flex-col justify-between h-full">
        {/* top */}
        <div>

          <div>
            <div className='flex flex-row justify-center gap-2'>
              <p>credit info</p>
              <p>nickname</p>
            </div>
          </div>

          <div className='w-full flex flex-row flex-nowrap'>
            <input 
              type='text' 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)}
              className={searchBoxStyle(inputText)}
              placeholder='Search'
            />
            <button className={textResetStyle(inputText)} onClick={(e) => setInputText('')}><MdHighlightOff className='w-6 h-6 text-slate-400 hover:text-slate-700' /></button>
          </div>

          <div className='flex flex-col gap-4 py-4'>
            {lists.map((list) => (
              <div key={`${list.title} memu list`}>
                <div className='flex flex-row gap-2 items-center hover:cursor-pointer hover:text-zinc-700 font-semibold tracking-wider' 
                  key={list.title + 'hover lists'} 
                  onClick={(e) => {linkClickHandler(e, list.href)}}
                >
                  <p>{list.title}</p>
                  <MdArrowForwardIos />
                </div>
                <div 
                  className='flex flex-row gap-2 items-center hover:text-zinc-700 hover:cursor-pointer hover:bg-white/20 p-1 rounded-md'
                  onClick={(e) => {listItemClickHandler(e, 'yay')}}
                >
                  <div className='w-8 rounded-md aspect-square bg-zinc-700' />
                  <div className='text-sm'>
                    <p className='font-semibold tracking-wider'>Dummy Title</p>
                    <p className='text-xs'>Dummy Description</p>
                  </div>
                </div>
              </div> 
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  )
}

// all streamers
// game info
// event info
// user info (if logged in)