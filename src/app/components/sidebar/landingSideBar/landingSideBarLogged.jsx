import { useState, useEffect } from 'react'
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { MdPerson } from 'react-icons/md';
import { ImNotification } from "react-icons/im";
import { motion } from "framer-motion";
import { hoveredElementStyle, ShuffleArrayLimit8, SortingUserArrayHighToLow } from '../elements/sharedFunctions';
import HoveredElement from '../elements/hoveredElement';
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const LandingSideBarLogged = () => {

  const [ isSectionCollapsed, setIsSectionCollapsed ] = useState(true)
  const [ hoveredStreamer, setHoveredStreamer ] = useState()
  const [ hoveredFollow, setHoveredFollow ] = useState()
  const [ receivedFollows, setReceivedFollows ] = useState([])
  const [ recommendedStreamers, setRecommendedStreamers ] = useState()

  const router = useRouter()
  const streamers = useSelector((state) =>  state.redux.allStreamers)
  const loggedUser = useSelector((state) => state.redux.auth)

  useEffect(() => {
    if(streamers && loggedUser) {
      if(streamers.length > 0) {
        const followedStreamers = loggedUser.follows
        let sortedArray = followedStreamers.toSorted((a, b) => a.follows.length - b.follows.length)
        setReceivedFollows(sortedArray)
      }
    }
  },[loggedUser, streamers])

  useEffect(() => {
    if(streamers) {
      if(streamers.length > 0) {
        let workingArray = streamers
        let shuffledArray = ShuffleArrayLimit8(workingArray)
        return setRecommendedStreamers(shuffledArray)
      }
    }
  },[streamers])

  const onHoverStreamerHandler = (id) => {
    setHoveredStreamer(id)
  } 

  const offHoverStreamerHandler = () => {
    setHoveredStreamer()
  }

  const onHoverFollowHandler = (id) => {
    setHoveredFollow(id)
  } 

  const offHoverFollowHandler = () => {
    setHoveredFollow()
  }

  const userClickHandler = (nickname) => {
    router.push(`/channel/home/${nickname}`)
  }

  return (
    <nav className="h-full flex flex-col max-w-36">
      <div className='w-full h-20 bg-black'></div>
      <div className='rounded-t-md bg-sky-900 px-2 h-full py-2'>
        {/* Followed Streamers title and collapse button */}
        <div className={!isSectionCollapsed ? 'flex flex-row justify-between items-center gap-2' : "flex flex-row justify-center items-center"}>
          {!isSectionCollapsed && <p className="text-sm font-bold">Follows</p>}
          <button onClick={() => setIsSectionCollapsed(!isSectionCollapsed)} className='hover:bg-sky-950 p-2 rounded-md'>{isSectionCollapsed? <BiArrowToRight className='w-5 h-5'/> : <BiArrowToLeft className='w-5 h-5'/> }</button>
        </div>

        <div className='flex flex-col pb-2 gap-2 border-b border-slate-400 mb-2'>
          {receivedFollows.length == 0 ?
          <div className='flex flex-col items-center text-center py-2 gap-2'>
            <ImNotification className='w-8 h-8 text-yellow-500'/>
            {!isSectionCollapsed && <p className='text-sm'>Looks like you don't have any follows.</p>}
          </div>
          :
          <div className='flex flex-col text-sm'>
            {receivedFollows.map((follow) => (
              <div
                key={'sidebarFollow' + follow._id}
                className='flex flex-row flex-nowrap items-center px-1.5 py-1.5 gap-2 hover:bg-sky-950 hover:cursor-pointer rounded-md relative'
                onMouseEnter={() => onHoverFollowHandler(follow._id)}
                onMouseLeave={() => offHoverFollowHandler()}
                onClick={() => userClickHandler(follow.nickname)}
              >
                {/* Icons */}
                {follow.profile ?
                  <img src={follow.profile} alt={follow.nickname + ' profile'} className="w-8 h-8 rounded-full" />
                  :
                  <div
                    className='min-w-8 h-8 rounded-full flex justify-center items-center bg-sky-950'
                  >
                    <MdPerson className='w-5 h-5' />
                  </div>
                }

                {/* nickname */}
                {!isSectionCollapsed &&
                  <div
                    className='w-full truncate'
                  >
                    <p className='text-sm font-semibold'>{follow.nickname}</p>
                    <p className='text-xs text-slate-400'>{follow.introduction}</p>
                  </div>
                }

                {/* hovered element */}
                {hoveredFollow === follow._id &&
                  <motion.div
                    className={hoveredElementStyle(isSectionCollapsed)}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.45}}
                  >
                    <HoveredElement collapsed={isSectionCollapsed} streamer={follow} />
                  </motion.div>
                }
              </div>
            ))}

          </div>
        }
        </div>

        {/* suggested streamers */}
        <div className={!isSectionCollapsed ? 'flex flex-row justify-between items-center gap-2' : "flex flex-row justify-center items-center"}>
          {!isSectionCollapsed && <p className="text-sm font-bold pb-1">Recommended</p>}
        </div>
        
        <div className='flex flex-col text-sm'>
          {recommendedStreamers && recommendedStreamers.map((streamer) => (
            <div
              key={streamer._id + ' sidebarStreamerLogged'}
              className="flex flex-row flex-nowrap items-center px-1.5 py-1.5 gap-2 hover:bg-sky-950 hover:cursor-pointer rounded-md relative"
              onMouseEnter={() => onHoverStreamerHandler(streamer._id)}
              onMouseLeave={() => offHoverStreamerHandler()}
              onClick={() => userClickHandler(streamer.nickname)}
            >

              {/* Icons */}
              {streamer.profile ?
                <img src={streamer.profile} alt={streamer.nickname + ' profile'} className="w-8 h-8 rounded-full" />
                :
                <div
                  className='min-w-8 h-8 rounded-full flex justify-center items-center bg-sky-950'
                >
                  <MdPerson className='w-5 h-5' />
                </div>
              }

              {/* nickname */}
              {!isSectionCollapsed &&
                <div
                  className='w-full truncate'
                >
                  <p className='text-sm font-semibold'>{streamer.nickname}</p>
                  <p className='text-xs text-slate-400 text-ellipsis overflow-hidden'>{streamer.introduction}</p>
                </div>
              }

              {/* hovered element */}
              {hoveredStreamer === streamer._id &&
                <motion.div
                  className={hoveredElementStyle(isSectionCollapsed)}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.45}}
                >
                  <HoveredElement collapsed={isSectionCollapsed} streamer={streamer} />
                </motion.div>
              }
            </div>
          ))}
        </div>
      </div>

    </nav>
  );
}
export default LandingSideBarLogged;