import { MdPerson } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import HoveredElement from "../elements/hoveredElement";
import { motion } from "framer-motion";
import { ShuffleArrayLimit8, hoveredElementStyle } from "../elements/sharedFunctions";

const LandingSideBarPublic = ({streamers}) => {

  const [ isSectionCollapsed, setIsSectionCollapsed ] = useState(true)
  const [ displayigStreamers, setDisplayingStreamers ] = useState()
  const [ hoveredStreamer, setHoveredStreamer ] = useState()

  useEffect(() => {
    let workingArray = streamers
    let shuffledArray = ShuffleArrayLimit8(workingArray)
    return setDisplayingStreamers(shuffledArray)
  },[])

  const onHoverHandler = (id) => {
    setHoveredStreamer(id)
  } 

  const offHoverHandler = () => {
    setHoveredStreamer()
  }

  return (
    <nav className="bg-sky-900 pt-20 h-full px-2">
      {/* title & fold */}
      <div className={!isSectionCollapsed ? 'flex flex-row justify-between items-center gap-2' : "flex flex-row justify-center items-center"}>
        {!isSectionCollapsed && <p className="text-sm font-bold">Recommended</p>}
        <button onClick={() => setIsSectionCollapsed(!isSectionCollapsed)} className='hover:bg-sky-950 p-2 rounded-md'>{isSectionCollapsed? <BiArrowToRight className='w-5 h-5'/> : <BiArrowToLeft className='w-5 h-5'/> }</button>
      </div>

      {/* recommended streamers */}
      <div className="flex flex-col text-sm">
        {displayigStreamers && displayigStreamers.map((streamer) => (
          <div
            key={streamer._id + ' sidebarStremaer'}
            className="flex flex-row flex-nowrap items-center px-1.5 py-1.5 gap-2 hover:bg-sky-950 hover:cursor-pointer rounded-md relative"
            onMouseEnter={() => onHoverHandler(streamer._id)}
            onMouseLeave={() => offHoverHandler()}
          >
            {/* Icons */}
            {streamer.profile ?
              <img src={streamer.profile} alt={streamer.nickname + ' profile'} className="w-8 h-8 rounded-full"/>
              :
              <div className="min-w-8 h-8 rounded-full flex justify-center items-center bg-sky-950">
                <MdPerson className='w-5 h-5'/>
              </div>
              }

            {/* nickname */}
            {!isSectionCollapsed &&
              <div className='w-full truncate'>
                <p className="text-sm font-semibold">{streamer.nickname}</p>
                <p className="text-xs text-slate-400">{streamer.introduction}</p>
              </div>
            }
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
    </nav>
  );
}
export default LandingSideBarPublic;