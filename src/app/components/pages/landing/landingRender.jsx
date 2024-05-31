'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import LandingSideBarPublic from '../../sidebar/landingSideBar/landingSideBarPublic'
import LandingSideBarLogged from '../../sidebar/landingSideBar/landingSideBarLogged'
import FeaturedStreamers from './featuredStreamers/featuredStremers'
import IGDBNewGames from './IGDB/NewGames'
import IGDBTopRated from './IGDB/TopRated'
import { getNewGames } from '@/redux/service/IGDBServices'

const LandingRender = () => {

  let session = useSession()

  const [ newReleases, setNewReleases ] = useState()
  const [ topRated, setTopRated ] = useState()

  useEffect(() => {
    let dummySendingData = '1234567890'
    let callAPI = setTimeout(async () => {

      let request = await getNewGames(dummySendingData)
      if(request) {
        if(request.status === 200) {
          console.log(request.data)
          setNewReleases(request.data.newReleases)
          setTopRated(request.data.topRated)
        }

        if(request.status === 408) {
          console.log('mongoError')
        }

        if(request.status === 409) {
          console.log('IGDBError')
        }
      } else {
        console.log('other error')
      }

    }, 1)
    return () => {
      clearTimeout(callAPI)
    }
  }, [])

  return (
    <div className='flex flex-row flex-nowrap h-full'>
      { session.status === 'authenticated' ? <LandingSideBarLogged /> : <LandingSideBarPublic /> }
      <div className='w-full h-full flex flex-col scrollbar-track-sky-950  scrollbar-thumb-white/40'>
        <div className='overflow-auto scrollbar-thin w-full h-full'>
          <FeaturedStreamers />
          <IGDBTopRated topRated={topRated} />
          <IGDBNewGames newReleases={newReleases} />
        </div>
      </div>
    </div>
  );
}
export default LandingRender;