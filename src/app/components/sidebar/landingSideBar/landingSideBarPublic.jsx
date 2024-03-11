import { ImTwitch, ImYoutube } from "react-icons/im";
import { MdPerson } from 'react-icons/md'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import Image from 'next/image'
import afreecaImage from '@/images/afreecaTV_logo_rgb_light_symbol.png'
import chzzkLogo from '@/images/chzzkLogo.png'
import kickImage from '@/images/Kick-logo-green-k.png'

const LandingSideBarPublic = ({streamers}) => {

  const [ isSectionCollapsed, setIsSectionCollapsed ] = useState(false)
  const [ displayigStreamers, setDisplayingStreamers ] = useState()

  useEffect(() => {
    let tempArry = []
    let streamersWorkingArry = streamers 
    let randomNumber = Math.floor(Math.random() * streamers.length)
    // while (streamersWorkingArry.length > 0) {

    // }
      // let randomNumber = Math.floor(Math.random() * streamers.length)
      // tempArry.push(streamers[randomNumber])

      // if (!tempArry.includes(randomNumber)) {
      //   tempArry.push(randomNumber)
      // }
    // }
    console.log(streamersWorkingArry[randomNumber], 'aaass')
  },[])

  return (
    <nav className="bg-sky-900 pt-20 h-full">
      {/* title & fold */}
      <div className="flex flex-row justify-between items-center">
        {!isSectionCollapsed && <p className="text-sm font-bold">Recommended</p>}
        <button onClick={() => setIsSectionCollapsed(!isSectionCollapsed)} className='hover:bg-white/20 p-2 rounded-md'>{isSectionCollapsed? <BiArrowToRight className='w-5 h-5'/> : <BiArrowToLeft className='w-5 h-5'/> }</button>
      </div>

      {/* recommended streamers */}
      <div className="flex flex-col gap-2">
        {}
      </div>
    </nav>
  );
}
export default LandingSideBarPublic;