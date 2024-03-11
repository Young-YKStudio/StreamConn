'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'

// pages
import LandingSideBarPublic from '../../sidebar/landingSideBar/landingSideBarPublic'
import LandingSideBarLogged from '../../sidebar/landingSideBar/landingSideBarLogged'
import FeaturedStreamers from './featuredStreamers/featuredStremers'

const LandingRender = ({streamers}) => {

  const session = useSession()
  console.log(streamers, session, 'landing render')

  return (
    <div className='flex flex-row flex-nowrap'>
      <LandingSideBarPublic streamers={streamers} />
      <container>
        <FeaturedStreamers streamers={streamers} />
      </container>
    </div>
  );
}
export default LandingRender;