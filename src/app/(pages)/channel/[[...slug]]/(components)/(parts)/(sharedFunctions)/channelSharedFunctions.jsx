import { ImTwitch, ImYoutube } from 'react-icons/im'
import Image from 'next/image'
import Link from 'next/link'
import afreecaImage from '@/images/afreecaTV_logo_rgb_light_symbol.png'
import chzzkLogo from '@/images/chzzkLogo.png'
import kickImage from '@/images/Kick-logo-green-k.png'

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