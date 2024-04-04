import { useState, useEffect } from 'react'
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { MdPerson } from 'react-icons/md';
import { ImNotification } from "react-icons/im";
import { motion } from "framer-motion";
import { hoveredElementStyle } from '../elements/sharedFunctions';
import HoveredElement from '../elements/hoveredElement';
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LandingSideBarLogged = ({streamers, session}) => {

  const [ isSectionCollapsed, setIsSectionCollapsed ] = useState(true)
  const [ hoveredStreamer, setHoveredStreamer ] = useState()
  const [ receivedFollowers, setReceivedFollowers ] = useState([])

  const router = useRouter()

  useEffect(() => {

    const getfollowers = async (id) => {
      try {
        const res = await axios.post(`/api/getFollowers/${id}`)
        if(res.status === 200 && res.status.message === 'No Followers') {
          // console.log(res.data, 'at logged side bar')
          setReceivedFollowers([])
        }
        if(res.status === 200) {
          // console.log(res.data, 'at logged side bar')
          // setReceivedFollowers(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if(session?.data) {
      let userId = session.data.user.id
      getfollowers(userId)
    }
  },[session])

  const onHoverHandler = (id) => {
    setHoveredStreamer(id)
  } 

  const offHoverHandler = () => {
    setHoveredStreamer()
  }

  const userClickHandler = (id) => {
    router.push(`/channel/home/${id}`)
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

        <div className='flex flex-col items-center text-center py-4 gap-2'>
          {receivedFollowers.length == 0 ?
          <>
            <ImNotification className='w-8 h-8 text-yellow-500'/>
            {!isSectionCollapsed && <p className='text-sm'>Looks like you don't have any follows.</p>}
          </>
          :
          <p>render</p>
        }
        </div>

        {/* suggested streamers */}
        <div className={!isSectionCollapsed ? 'flex flex-row justify-between items-center gap-2' : "flex flex-row justify-center items-center"}>
          {!isSectionCollapsed && <p className="text-sm font-bold">Recommended</p>}
        </div>
        
        <div className='flex flex-col text-sm'>
          {streamers && streamers.map((streamer) => (
            <div
              key={streamer._id + ' sidebarStreamerLogged'}
              className="flex flex-row flex-nowrap items-center px-1.5 py-1.5 gap-2 hover:bg-sky-950 hover:cursor-pointer rounded-md relative"
              onMouseEnter={() => onHoverHandler(streamer._id)}
              onMouseLeave={() => offHoverHandler()}
              onClick ={() => userClickHandler(streamer._id)}
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
                  <p className='text-xs text-slate-400'>{streamer.introduction}</p>
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