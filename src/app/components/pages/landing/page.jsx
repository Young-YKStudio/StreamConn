'use client'
import { useSession } from 'next-auth/react'


// pages
import LandingSideBarPublic from '../../sidebar/landingSideBar/landingSideBarPublic'
import LandingSideBarLogged from '../../sidebar/landingSideBar/landingSideBarLogged'
import FeaturedStreamers from './featuredStreamers/featuredStremers'

const LandingRender = () => {

  let session = useSession()


  return (
    <div className='flex flex-row flex-nowrap h-full'>
      { session.status === 'authenticated' ? <LandingSideBarLogged /> : <LandingSideBarPublic /> }
      <FeaturedStreamers />
    </div>
  );
}
export default LandingRender;