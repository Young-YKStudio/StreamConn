import { ImTwitch, ImYoutube } from 'react-icons/im'
import Image from 'next/image'
import afreecaImage from '@/images/afreecaTV_logo_rgb_light_symbol.png'
import chzzkLogo from '@/images/chzzkLogo.png'
import kickImage from '@/images/Kick-logo-green-k.png'

// shared logics
export const ShuffleArray = (array) => {
  let workingArray = array
  for (let i = workingArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
  }
  return workingArray;
}

export const ShuffleArrayLimit8 = (array) => {
  let workingArray = []
  while (workingArray.length >= 0 && workingArray.length <= 8) {
    let randomPickedStreamer = array[Math.floor(Math.random() * array.length)]
    let duplicatedStreamer = workingArray.find((streamer) => streamer == randomPickedStreamer)
    if(!duplicatedStreamer) {
      workingArray.push(randomPickedStreamer)
    }
    if(workingArray.length === array.length) {
      return workingArray
    }
  }
  return workingArray
}

// shared styles
export const hoveredElementStyle = (condition) => {
  if(condition) {
    return 'absolute left-16 top-0 bg-sky-900 p-3 rounded-md w-48 flex flex-col gap-1'
  }
  if(!condition) {
    return 'absolute left-40 top-0 bg-sky-900 p-3 rounded-md w-48 flex flex-col gap-1'
  }
}

export const ImageDistributor = (platform) => {
  if(platform.name === 'Twitch') {
    return <p className='text-purple-600'><ImTwitch className='w-3 h-3 rounded-full' /></p>
  }
  if(platform.name === 'YouTube') {
    return <p className='text-red-600'><ImYoutube className='w-3 h-3 rounded-full' /></p>
  }
  if(platform.name === 'Chzzk') {
    return <Image src={chzzkLogo} alt='chzzkLogo' className='w-3 h-3 rounded-full'/>
  }
  if(platform.name === 'Afreeca') {
    return <Image src={afreecaImage} alt='afreecaLogo' className='w-3 h-3 rounded-full' />
  }
  if(platform.name === 'KICK') {
    return <Image src={kickImage} alt='kickLogo' className='w-3 h-3 rounded-full' />
  }
}

export const NumberFormatter = (number) => {
  return Math.abs(number) > 999? Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'k' : Math.sign(number)*Math.abs(number)
}