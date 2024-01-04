'use client'

import { ImTwitch, ImYoutube } from 'react-icons/im'
import { MdPerson } from 'react-icons/md'
const chzzkLogo = 'https://i.namu.wiki/i/QA7A5LmG-R_DeaQN7OkwRgvxn0IqN2TvPcoVwcRVLLAb6WAlZ0_rah9RUmaiLIzRWGLviTiiZg6Edsev_UceLA.svg'
const afreecaLogo = 'https://i.namu.wiki/i/SjQ-LzEVCR7OVY-LLlRsvmbzk1M6W7MnwVHYr2FvbhfqeHBAXSo3zLfhZ53n1m8S0px9u24zn82lZtTuJ8awqg.svg'

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

  return (
    <nav className="bg-slate-800 h-screen pt-20 w-48 px-4">
      {/* Title / sort / fold */}
      <div className='my-2'>
        <p className='font-bold'>Your Follows</p>
      </div>

      {/* Streamer lists */}
      <div className='flex flex-col gap-2'>
        {dummyLists && dummyLists.map((list) => {
          return <div key={list.id} className='flex flex-row flex-nowrap gap-2 items-center hover:bg-sky-900 p-1 rounded-md hover:cursor-pointer'>
            {/* Icon Images */}
            <div className="min-w-8 h-8 rounded-full bg-sky-500 flex justify-center items-center">
              <p><MdPerson className='w-5 h-5'/></p>
            </div>

            {/* Stremer name / category */}
            <div className='w-full truncate'>
              <p className='text-sm font-semibold'>{list.name ? list.name : list.id} </p>
              <p className='text-xs text-slate-400'>{list.category}</p>
            </div>

            {/* view count / platform */}
            <div className='flex flex-col items-end justify-end gap-0.5'>
              {platformDistributor(list.platform)}
              <p className='text-sm text-slate-300'>{numberFormatter(list.viewCount)}</p>
            </div>
          </div>
        })}
      </div>
    </nav>
  );
}
export default SideBar;