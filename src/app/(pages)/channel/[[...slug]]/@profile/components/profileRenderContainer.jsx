'use client'
import { TbHttpConnect } from "react-icons/tb";
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

const ProfileRenderContainer = ({user}) => {

  console.log(user, 'profile render')

  return (
    <section className="flex flex-row justify-between w-full max-w-4xl pt-8">
      {/* Left Side */}
      <div className="flex flex-row gap-4 items-center">
        {/* Image */}
        <img src={user.profile}  className="w-20 h-20 rounded-full"/>

        {/* streamer info */}
        <div>
          {/* nickname and icon */}
          <div className="flex flex-row gap-2 items-center">
            <p className="tracking-wide font-bold text-2xl">{user.nickname}</p>
            <div className="px-2 border border-sky-500 rounded-lg">
              <TbHttpConnect className="w-6 h-6 text-sky-500 "/>
            </div>
          </div>

          {/* follows */}
          <div className="flex flex-row items-center gap-4 font-light">
            <p className="text-sm">{user.followers.length} <span className="text-slate-400">Followers</span></p>
            {/* add event number? */}
            <p> | </p>
            <div className="flex flex-row gap-3 items-center">
              {user.platforms.length > 0 && user.platforms.map((platform) => (
                <div key={platform.name + user.nickname}>
                  {ImageDistributor(platform)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div>
        <button>follow</button>
        <button>Subscribe</button>
      </div>
    </section>
  );
}
export default ProfileRenderContainer;