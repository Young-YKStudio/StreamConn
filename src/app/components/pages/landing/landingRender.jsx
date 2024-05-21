'use client'
import { useSession } from 'next-auth/react'
import LandingSideBarPublic from '../../sidebar/landingSideBar/landingSideBarPublic'
import LandingSideBarLogged from '../../sidebar/landingSideBar/landingSideBarLogged'
import FeaturedStreamers from './featuredStreamers/featuredStremers'
import IGDBNewGames from './IGDB/NewGames'

const LandingRender = () => {

  let session = useSession()

  return (
    <div className='flex flex-row flex-nowrap h-full'>
      { session.status === 'authenticated' ? <LandingSideBarLogged /> : <LandingSideBarPublic /> }
      <div>
        <FeaturedStreamers />
        <IGDBNewGames />
      </div>
    </div>
  );
}
export default LandingRender;