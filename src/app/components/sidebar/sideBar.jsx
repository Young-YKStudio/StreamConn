'use client'

import { ImTwitch, ImYoutube } from 'react-icons/im'
import { MdPerson } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

const chzzkLogo = 'https://play-lh.googleusercontent.com/wvo3IB5dTJHyjpIHvkdzpgbFnG3LoVsqKdQ7W3IoRm-EVzISMz9tTaIYoRdZm1phL_8=w480-h960-rw'
const afreecaLogo = 'data:image/png;base64,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'

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
    return <img src={chzzkLogo} className='w-3 h-3'/>
  }
  if(platform === 'Afreeca') {
    return <img src={afreecaLogo} className='w-3 h-3'/>
  }
  return 
}

const numberFormatter = (number) => {
  return Math.abs(number) > 999 ? Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'k' : Math.sign(number)*Math.abs(number)
}


const SideBar = () => {

  const router = useRouter()

  const [ isSectionCollapsed, setIsSectionCollapsed ] = useState(false)

  const followClickHandler = (e, id) => {
    router.push(`/account/${id}`)
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
export default SideBar;