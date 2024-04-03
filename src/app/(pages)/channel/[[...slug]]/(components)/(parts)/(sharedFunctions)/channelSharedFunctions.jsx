import { ImTwitch, ImYoutube } from 'react-icons/im'
import Image from 'next/image'
import Link from 'next/link'
import afreecaImage from '@/images/afreecaTV_logo_rgb_light_symbol.png'
import chzzkLogo from '@/images/chzzkLogo.png'
import kickImage from '@/images/Kick-logo-green-k.png'
import { FaHashtag } from "react-icons/fa6";
import { MdOutlineCircle, MdCoPresent, MdPeopleAlt, MdCheckCircle } from 'react-icons/md'

export const ImageDistributor = (platform) => {
  if(platform.name === 'Twitch') {
    return <a href={platform.href} target='_blank' className='hover:text-purple-600'><ImTwitch className='w-4 h-4 rounded-md' /></a>
  }
  if(platform.name === 'YouTube') {
    return <a href={platform.href} target='_blank' className='hover:text-red-600'><ImYoutube className='w-4 h-4 rounded-md' /></a>
  }
  if(platform.name === 'Chzzk') {
    return <Link href={platform.href} target="_blank" className="saturate-0 hover:filter-none"><Image src={chzzkLogo} alt='chzzkLogo' className='w-4 h-4 rounded-md'/></Link>
  }
  if(platform.name === 'Afreeca') {
    return <Link href={platform.href} target="_blank" className="saturate-0 hover:filter-none"><Image src={afreecaImage} alt='afreecaLogo' className='w-4 h-4 rounded-md' /></Link>
  }
  if(platform.name === 'KICK') {
    return <Link href={platform.href} target="_blank" className="saturate-0 hover:filter-none"><Image src={kickImage} alt='kickLogo' className='w-4 h-4 rounded-md' /></Link>
  }
}

export const tabButtonStyles = (currentSection, channel) => {
  if(currentSection !== channel) {
    return 'text-gray-400 hover:text-white px-3 py-1.5 truncate flex flex-row items-center gap-0.5'
  }
  if(currentSection === channel) {
    return 'rounded-md px-3 py-1.5 font-medium bg-sky-800 flex flex-row items-center gap-0.5'
  }
}

export const channelTypes = [
  { type: 'Text' },
  { type: 'Collaboration' },
  { type: 'Participation' },
]

export const channelTypeDistributor = (type, selected) => {
  if(type === 'Text') {
    return (
      <div className={selected === 'Text' ? 'flex flex-row justify-between items-center bg-black/30 px-3 py-2 rounded-md' : 'flex flex-row justify-between items-center bg-black/10 hover:bg-white/10 hover:cursor-pointer px-3 py-2 rounded-md'}>
        <div className='flex flex-row gap-2 items-center'>
          <FaHashtag className='w-5 h-5'/>
          <div className='text-sm'>
            <p className='font-medium'>Text Channel</p>
            <p className='text-slate-300 text-xs'>Send messages, images, GIFs, share opinions</p>
          </div>
        </div>
        {selected === 'Text' ? <MdCheckCircle className='w-5 h-5 text-sky-500' /> : <MdOutlineCircle className='w-5 h-5' />}
      </div>
    )
  }

  if(type === 'Collaboration') {
    return (
      <div className={selected === 'Collaboration' ? 'flex flex-row justify-between items-center bg-black/30 px-3 py-2 rounded-md' : 'flex flex-row justify-between items-center bg-black/10 hover:bg-white/10 hover:cursor-pointer px-3 py-2 rounded-md'}>
        <div className='flex flex-row gap-2 items-center'>
          <MdPeopleAlt className='w-5 h-5'/>
          <div className='text-sm'>
            <p className='font-medium'>Collaboration Channel</p>
            <p className='text-slate-300 text-xs'>Connect and schedule with other streamers</p>
          </div>
        </div>
        {selected === 'Collaboration' ? <MdCheckCircle className='w-5 h-5 text-sky-500' /> : <MdOutlineCircle className='w-5 h-5' />}
      </div>
    )
  }

  if(type === 'Participation') {
    return (
      <div className={selected === 'Participation' ? 'flex flex-row justify-between items-center bg-black/30 px-3 py-2 rounded-md' : 'flex flex-row justify-between items-center bg-black/10 hover:bg-white/10 hover:cursor-pointer px-3 py-2 rounded-md'}>
        <div className='flex flex-row gap-2 items-center'>
          <MdCoPresent className='w-5 h-5'/>
          <div className='text-sm'>
            <p className='font-medium'>Participation Channel</p>
            <p className='text-slate-300 text-xs'>Connect and schedule with stream viewers</p>
          </div>
        </div>
        {selected === 'Participation' ? <MdCheckCircle className='w-5 h-5 text-sky-500' /> : <MdOutlineCircle className='w-5 h-5' />}
      </div>
    )
  }
}

export const userValidator = (currentUser, channelOwner) => {
  if(currentUser._id === channelOwner._id) {
    return true
  }

  const moderator = channelOwner.moderators.find((user) => user._id === currentUser._id)

  if(moderator) {
    return true
  }

  return false
}