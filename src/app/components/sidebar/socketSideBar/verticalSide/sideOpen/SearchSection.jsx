import { MdPersonSearch } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export const SearchSection = ({setIsSearchOpened}) => {

  const [ searchInput, setSearchInput ] = useState('')
  const [ searchedStreamers, setSearchedStreamers ] = useState([])
  const [ searchedEvents, setSearchedEvents ] = useState([])

  const allStreamers = useSelector(state => state.redux.allStreamers)

  useEffect(() => {

  },[searchInput])

  return (
    <motion.div 
      className="absolute left-[3.8rem] z-40 bg-sky-400 h-full rounded-r-md shadow-xl p-2 pr-4"
      initial={{width: '12rem'}}
      animate={{width: '13rem'}}
      transition={{duration: 0.25, type: 'spring', damping: 10, stiffness: 200}}
    >
      <div
        className='relative'
      >
        <div className='flex flex-row items-center py-2'>
          <MdPersonSearch className='w-8 h-8' />
          <p className='font-fredoka font-bold text-2xl'>SEARCH</p>
        </div>
        <div className='relative'>
          <div
            className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'
          >
            <svg className="w-4 h-4 text-zinc-700 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type='text' 
            className='rounded-md w-full text-xs text-zinc-700 ps-8'
            placeholder='Search' 
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>

        {/* before search */}
        <div>
          <div>
            <p>Streamers</p>
          </div>
          <div>
            <p>Events</p>
          </div>
        </div>
        {/* after search */}
      </div>
    </motion.div>
  )
}