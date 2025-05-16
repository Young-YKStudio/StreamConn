import { MdOutlineLogin, MdOutlineHome, MdPersonSearch, MdExplore, MdPerson, MdHelp, MdMonitor } from "react-icons/md";
import { useState, useEffect } from 'react'
import { ShuffleArrayLimit8 } from "@/app/util/SharedFunctions";
import { useRouter } from 'next/navigation'
import { HoverElement } from "./HoverElement";
import { SearchSection } from "./sideOpen/SearchSection";
import { LoginPopUp } from "./LoginPopUp";
import { motion } from 'framer-motion'
import { setLogInCallback } from "@/redux/slice";
import { useDispatch } from 'react-redux'

const dividerElement = () => {
  return (
    <div
      className="w-10 h-[1.5px] bg-slate-300 my-1"
    />
  )
}

export const SocketVerticalSideBar = ({allStreamers, path}) => {

  const [ hoveredElement, setHoveredElement ] = useState({
    type: '',
    streamer: null
  })
  const [ isSearchOpened, setIsSearchOpened ] = useState(false)
  const [ isBrowseOpened, setIsBrowseOpened ] = useState(false)
  const [ isAccountOpened, setIsAccountOpened ] = useState(false)
  const [ displayingStreamers, setDisplayingStreamers ] = useState()
  const [ hoveredStreamer, setHoveredStreamer ] = useState()
  const [ isLoginButton, setIsLoginButton ] = useState(false)

  const router = useRouter()
  const dispatch  = useDispatch()

  useEffect(() => {
    if(allStreamers) {
      if(allStreamers.length > 0) {
        let workingArray = allStreamers
        let shuffledArray = ShuffleArrayLimit8(workingArray)
        return setDisplayingStreamers(shuffledArray)
      }
    }
  },[allStreamers])

  const onHoverHandler = (streamer) => {
    let state = {
      type: 'streamer',
      streamer: streamer
    }
    setHoveredElement(state)
  }

  const offHoverHandler = () => {
    let state = {
      type: '',
      streamer: null
    }
    setHoveredElement(state)
  }

  const otherButtonHoverHandler = (string) => {
    let state = {
      type: string,
      streamer: null
    }
    setHoveredElement(state)
  }

  const otherButtonOffHandler = (string) => {
    let state = {
      type: '',
      streamer: null
    }
    setHoveredElement(state)
  }

  const userClickHandler = (e, nickname) => {
    router.push(`/channel/${nickname}/home`)
  }

  const homeButtonClickHandler = () => {
    router.push('/')
  }

  const loginButtonClickHandler = async () => {

    await dispatch(setLogInCallback(path))

    router.push('/login')

    // await setIsLoginButton(!isLoginButton)
  }

  const searchAndBrowseButtonHandler = (e, type) => {
    if(type === 'search') {
      return setIsSearchOpened(!isSearchOpened)
    }
  }

  const hoveringElementDistributor = () => {

    return (
      <motion.div
        className="absolute left-14 z-20 shadow-xl"
        initial={{opacity: 0, left: 42}}
        animate={{opacity: 1, left: 48}}
        transition={{duration: 0.125, type: 'spring', damping: 10, stiffness: 200}}
      >
        <HoverElement hoverElement={hoveredElement} />
      </motion.div>
    )
  }

  return (
    <div
      className="z-50 relative flex flex-row"
    >
      {/* nav bar */}
      <div
        className="flex flex-col justify-between items-center py-2 h-full text-white w-14 ring-4 ring-sky-400 rounded-lg shadow-xl bg-zinc-800"
      >
        {/* top section */}
        <div className="flex flex-col gap-2">
          {/* home button */}
          <div
            className="w-10 aspect-square relative bg-sky-400 hover:bg-sky-700 rounded-md flex items-center justify-center hover:cursor-pointer"
            onMouseEnter={() => otherButtonHoverHandler('home')}
            onMouseLeave={() => otherButtonOffHandler()}
            onClick={homeButtonClickHandler}
            >
            <MdOutlineHome className="w-8 h-8" />
            {hoveredElement.type === 'home' && 
              hoveringElementDistributor()
            }
          </div>
          {dividerElement()}
          {/* search */}
          <div
            className="relative w-10 aspect-square bg-white hover:bg-sky-400 rounded-md flex items-center justify-center hover:cursor-pointer text-zinc-800 hover:text-white"
            onMouseEnter={() => otherButtonHoverHandler('search')}
            onMouseLeave={() => otherButtonOffHandler()}
            onClick={(e) => searchAndBrowseButtonHandler(e, 'search')}
          >
            <MdPersonSearch className="w-8 h-8" />
            {hoveredElement.type === 'search' &&
              hoveringElementDistributor()
            }
          </div>
          {/* browse */}
          <div
            className="relative w-10 aspect-square bg-white hover:bg-sky-400 rounded-md flex items-center justify-center hover:cursor-pointer text-zinc-800 hover:text-white"
            onMouseEnter={() => otherButtonHoverHandler('browse')}
            onMouseLeave={() => otherButtonOffHandler()}
            onClick={homeButtonClickHandler}
          >
            <MdExplore className="w-8 h-8" />
            {hoveredElement.type === 'browse' &&
              hoveringElementDistributor()
            }
          </div>

          {/* favorite links */}
          {/* streamer links */}
          <div
            className="w-10 flex items-center justify-center relative my-1"
            onMouseEnter={() => otherButtonHoverHandler('recommended')}
            onMouseLeave={() => otherButtonOffHandler()}
          >
            <MdMonitor className="w-5 h-5"/>
            {hoveredElement.type === 'recommended' &&
              hoveringElementDistributor()
            }
          </div>
          <div className="flex flex-col max-w-10 gap-2">
            {displayingStreamers && displayingStreamers.map((streamer) => (
              <div
                key={streamer._id + ' sidebarSuggested'}
                className="w-10 aspect-square bg-white rounded-md flex items-center justify-center hover:bg-sky-400 text-zinc-800 hover:text-white bg-blend-multiply relative hover:cursor-pointer"
                style={streamer.profile && {backgroundImage: `url("${streamer.profile}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                onMouseEnter={() => onHoverHandler(streamer)}
                onMouseLeave={() => offHoverHandler()}
                onClick={(e) => userClickHandler(e, streamer.nickname)}
              >
                {!streamer.profile &&
                  <div>
                    <MdPerson className="w-8 h-8"  />
                  </div>
                }

                {hoveredElement.streamer === streamer && 
                  hoveringElementDistributor()
                }
              </div>
            ))}
          </div>
        </div>

        {/* bottom section */}
        <div className="flex flex-col w-full items-center gap-2">
          {/* help button */}
          {dividerElement()}
          <div 
            className="hover:text-sky-400 hover:cursor-pointer w-10 aspect-square flex justify-center items-center relative"
            onMouseEnter={() => otherButtonHoverHandler('help')}
            onMouseLeave={() => otherButtonOffHandler()}
          >
            <MdHelp className="w-8 h-8" />
            {hoveredElement.type === 'help' &&
              hoveringElementDistributor()
            }
          </div>
          {dividerElement()}
          {/* account button */}
          <div 
            className="w-10 aspect-square relative bg-sky-400 hover:bg-sky-700 rounded-md flex items-center justify-center hover:cursor-pointer"
            onMouseEnter={() => otherButtonHoverHandler('login')}
            onMouseLeave={() => otherButtonOffHandler()}
            onClick={loginButtonClickHandler}
          >
            <MdOutlineLogin className="w-7 h-7" />
            {hoveredElement.type === 'login' && 
              hoveringElementDistributor()
            }
          </div>
        </div>
      </div>

      {/* open sections */}
      {isSearchOpened &&
        <SearchSection setIsSearchOpened={setIsSearchOpened} />
      }
    </div>
  )

}