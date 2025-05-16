import { ImTwitch, ImYoutube } from 'react-icons/im'
import Image from 'next/image'
import Link from 'next/link'
import afreecaImage from '@/images/afreecaTV_logo_rgb_light_symbol.png'
import chzzkLogo from '@/images/chzzkLogo.png'
import kickImage from '@/images/Kick-logo-green-k.png'
import { FaHashtag } from "react-icons/fa6";
import { MdOutlineCircle, MdCoPresent, MdPeopleAlt, MdCheckCircle, MdOutlineEdit } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import { PiStarBold, PiStarFill, PiHeartBold, PiHeartBreakFill, PiHeartFill } from 'react-icons/pi'

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

export const channelTypeButtonStyles = (currentChannelType, selectedChannelType) => {
  if(currentChannelType === selectedChannelType) {
    return 'rounded-md px-3 py-1.5 font-medium bg-sky-400 flex flex-row gap-2 items-center'
  }

  return 'rounded-md px-3 py-1.5 font-medium bg-sky-400 hover:bg-sky-800 flex flex-row gap-2 items-center text-white'
}

export const channelTypeButtonIcons = (channelType) => {
  if(channelType === 'Text') {
    return <FaHashtag className='w-4 h-4'/>
  }

  if(channelType === 'Collaboration') {
    return <MdPeopleAlt className='w-5 h-5'/>
  }

  if(channelType === 'Participation') {
    return <MdCoPresent className='w-5 h-5'/>
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

export const channelNameValidator = (channelName) => {
  const specialCharacters = `/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/ `
  const notValidated = specialCharacters.split('').some(char => channelName.includes(char)) 

  if(notValidated) {
    toast.error('Channel name should not contain special characters')
    return true
  }

  if(channelName.length < 2 || channelName.length > 16) {
    toast.error('Channel name must be between 2 - 16 characters long')
    return true
  }

  return false
}

export const usernameValidator = (username) => {
  const specialCharacters = `/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/ `
  const notValidated = specialCharacters.split('').some(char => username.includes(char)) 

  if(notValidated) {
    toast.error('Username should not contain special characters')
    return true
  }

  if(username.length < 2 || username.length > 16) {
    toast.error('Username must be between 2 - 16 characters long')
    return true
  }

  return false
}

export const accountNotLoggedEvent = (e) => {
  e.preventDefault()
  toast.error('You must be logged in')
}

// profile functions

export const followButtonStyle = (state) => {
  if(state) {
    return 'rounded-md px-3 py-1.5 font-medium bg-sky-400 flex flex-row items-center gap-0.5 hover:bg-red-900 flex flex-row gap-1 tracking-wide text-white'
  }

  return 'rounded-md px-3 py-1.5 font-medium bg-sky-400 flex flex-row items-center gap-0.5 hover:bg-sky-900 flex flex-row gap-1 tracking-wide text-white'
}

export const profileButtonDistributor = (loggedUser, channelOwner, setModalOn, addFollowFunction, addSubscriptionFunction, isFollowedButtonHovered, setHoverOnFollows, setHoverOffFollows, unfollowFunction) => {
  if(!loggedUser) {
    return (
      <div className="flex items-end h-full gap-2 pb-4 text-sm">
        <button onClick={(e) => accountNotLoggedEvent(e)} className={followButtonStyle()}><PiHeartBold className="w-5 h-5"/>Follow</button>
        <button onClick={(e) => accountNotLoggedEvent(e)} className={followButtonStyle()}><PiStarBold className="w-5 h-5"/>Subscribe</button>
      </div>
    )
  }
  if(loggedUser._id === channelOwner._id) {
    return (
      <div className="flex items-end h-full gap-2 pb-4 text-sm">
        <button onClick={(e) => setModalOn(e)} className={followButtonStyle()}><MdOutlineEdit className="w-5 h-5"/>Manage Channel</button>
      </div>
    )
  }

  let followedChannel = loggedUser.follows.find((streamer) => streamer._id == channelOwner._id)

  // TODO: add more condition for subscriptions
  if(followedChannel) {

    return (
      <div className="flex items-end h-full gap-2 pb-4 text-sm">
        <button 
          onClick={(e) => unfollowFunction(e)} 
          className={followButtonStyle(isFollowedButtonHovered)}
          onMouseEnter={(e) => setHoverOnFollows(e)}
          onMouseLeave={(e) => setHoverOffFollows(e)}
        >
          {isFollowedButtonHovered ?
          <>
            <PiHeartBreakFill className="w-5 h-5"/>Unfollow
          </>
          :
          <>
            <PiHeartFill className="w-5 h-5"/>Followed
          </>
          }
        </button>
        <button onClick={(e) => addSubscriptionFunction(e)} className={followButtonStyle()}><PiStarBold className="w-5 h-5"/>Subscribe</button>
      </div>
    )
  }

  return (
    <div className="flex items-end h-full gap-2 pb-4 text-sm">
      <button onClick={(e) => addFollowFunction(e)} className={followButtonStyle()}><PiHeartBold className="w-5 h-5"/>Follow</button>
      <button onClick={(e) => addSubscriptionFunction(e)} className={followButtonStyle()}><PiStarBold className="w-5 h-5"/>Subscribe</button>
    </div>
  )
}

//start -> static top for tab section
// responsive design for profile parts when small