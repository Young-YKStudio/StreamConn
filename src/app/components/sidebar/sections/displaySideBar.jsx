'use client'

import { ImTwitch, ImYoutube } from 'react-icons/im'
import { MdPerson } from 'react-icons/md'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { afreecaLogo, chzzkLogo } from '@/app/data/logoLinks'
import Image from 'next/image'
import afreecaImage from '../../../../images/afreecaTV_logo_rgb_light_symbol.png'
import kickImage from '../../../../images/Kick-logo-green-k.png'
import { useEffect } from 'react'

const dummyLists = [
  {
    name: 'sample1',
    id: 'samplesample1',
    viewCount: 23,
    category: 'sampleCat1',
    platform: 'Twitch'
  },
  {
    name: 'sample2',
    id: 'samplesample2',
    viewCount: 213,
    category: 'sampleCat2asdfasddf',
    platform: 'Chzzk'
  },
  {
    id: 'samplesample3',
    viewCount: 2453,
    category: 'sampleCat3',
    platform: 'Afreeca'
  },
  {
    name: 'sample4',
    id: 'samplesample4',
    viewCount: 23654,
    category: 'sampleCat4',
    platform: 'YouTube'
  },
]

const platformDistributor = (platform) => {
  if(platform === 'Twitch') {
    return <p><ImTwitch className='w-3 h-3 text-purple-600'/></p>
  }
  if(platform === 'YouTube') {
    return <p><ImYoutube className='w-3 h-3 text-red-600'/></p>
  }
  if(platform === 'Chzzk') {
    return <Image src={chzzkLogo} className='w-3 h-3'/>
  }
  if(platform === 'Afreeca') {
    return <Image src={afreecaImage} className='w-3 h-3'/>
  }
  if(platform === 'KICK') {
    return <Image src={kickImage} className='w-3 h-3'/>
  }
  return 
}

const numberFormatter = (number) => {
  return Math.abs(number) > 999 ? Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'k' : Math.sign(number)*Math.abs(number)
}

const DisplaySideBar = () => {

  const {push, query, isReady} = useRouter()
  const params = useParams()

  const [ isSectionCollapsed, setIsSectionCollapsed ] = useState(true)

  const followClickHandler = (e, id) => {
    push(`/account/${id}`)
  }

  const collapseHandler = () => {
    setIsSectionCollapsed(!isSectionCollapsed)
  }

  const styleDistributor = (section, boolean) => {
    if(section === 'topBox' && boolean) {
      return 'my-2 flex flex-row justify-between rounded-md hover:cursor-pointer'
    }
    if(section === 'topBox' && !boolean) {
      return 'my-2 flex flex-row justify-between w-full'
    }
  }

  return (
    <nav className="bg-slate-800 h-screen pt-20 px-4 flex flex-col items-center">
      {/* Title / sort / fold */}
      <div className={styleDistributor('topBox', isSectionCollapsed)}>
        {!isSectionCollapsed && <p className='font-bold py-2'>Your Follows</p>}
        <button onClick={collapseHandler} className='hover:bg-white/20 p-2 rounded-md'>{isSectionCollapsed ? <BiArrowToRight className='w-5 h-5'/> : <BiArrowToLeft className='w-5 h-5'/> }</button>
      </div>

      {/* Streamer lists */}
      <div className='flex flex-col gap-2'>
        {dummyLists && dummyLists.map((list) => {
          return <div key={list.id} className='flex flex-row flex-nowrap gap-2 items-center hover:bg-sky-900 p-1 rounded-md hover:cursor-pointer' onClick={(e) => followClickHandler(e, list.id)}>
            {/* Icon Images */}
            <div className="min-w-8 h-8 rounded-full bg-sky-500 flex justify-center items-center">
              <p><MdPerson className='w-5 h-5'/></p>
            </div>

            {/* Stremer name / category */}
            {
              !isSectionCollapsed &&
              <div className='w-full truncate'>
                <p className='text-sm font-semibold'>{list.name ? list.name : list.id} </p>
                <p className='text-xs text-slate-400'>{list.category}</p>
              </div>
            }

            {/* view count / platform */}
            {
              !isSectionCollapsed &&
              <div className='flex flex-col items-end justify-end gap-0.5'>
                {platformDistributor(list.platform)}
                <p className='text-xs pt-1 text-slate-300'>{numberFormatter(list.viewCount)}</p>
              </div>
            }
          </div>
        })}
      </div>
    </nav>
  );

}
export default DisplaySideBar;