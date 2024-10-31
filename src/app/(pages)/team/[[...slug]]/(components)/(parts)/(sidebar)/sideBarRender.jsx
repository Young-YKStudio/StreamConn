'use client'
import { useSession } from 'next-auth/react'

import LandingSideBarLogged from '@/app/components/sidebar/landingSideBar/landingSideBarLogged'
import LandingSideBarPublic from '@/app/components/sidebar/landingSideBar/landingSideBarPublic'

const ChannelSideBarRender = ({streamers}) => {

  const session = useSession()

  return (
    <div className='flex flex-row flex-nowrap h-full'>
      { session.status === 'authenticated' ? <LandingSideBarLogged streamers={streamers} session={session}/> : <LandingSideBarPublic streamers={streamers} /> }
    </div>
  );
}
export default ChannelSideBarRender;