'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'

// pages
import LandingSideBarPublic from '../../sidebar/landingSideBar/landingSideBarPublic'
import LandingSideBarLogged from '../../sidebar/landingSideBar/landingSideBarLogged'
import FeaturedStreamers from './featuredStreamers/featuredStremers'

const LandingRender = ({streamers}) => {

  let session = useSession()

  return (
    <div className='flex flex-row flex-nowrap h-full'>
      { session.status === 'authenticated' ? <LandingSideBarLogged streamers={streamers} session={session}/> : <LandingSideBarPublic streamers={streamers} /> }
      <FeaturedStreamers streamers={streamers} />
    </div>
  );
}
export default LandingRender;