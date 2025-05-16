'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { IntroSection } from './Introduction/IntroSection'
import FeaturedStreamers from './featuredStreamers/featuredStremers'
import IGDBNewGames from './IGDB/NewGames'
import IGDBTopRated from './IGDB/TopRated'


const LandingRender = ({allStreamers}) => {

  let session = useSession()



  return (
    <div className='flex flex-row flex-nowrap h-full w-full'>
      <div className='w-full h-full flex flex-col scrollbar-track-zinc-800  scrollbar-thumb-sky-700'>
        <div className='overflow-auto scrollbar-thin w-full h-full'>
          <IntroSection />
          <FeaturedStreamers />
          {/* <IGDBTopRated topRated={topRated} />
          <IGDBNewGames newReleases={newReleases} /> */}
        </div>
      </div>
    </div>
  );
}
export default LandingRender;