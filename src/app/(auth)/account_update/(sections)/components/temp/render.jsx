'use client'

import GoBackButton from './components/goBackButton'
import AddStreamerAddress from './components/addStreamerAddress'
import AddStreamerInformation from './components/addStreamerInformation'
import AskPlatform from './components/askPlatform'
import NotSupported from './components/notsupported'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

import { useState } from 'react'

const Account_Update_Render = ({user, allStreamers}) => {

  const [ currentPage, setCurrentPage ] = useState('intro')
  const [platforms, setPlatforms] = useState([
    {
      name: 'Twitch',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'YouTube',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'Chzzk',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'Afreeca',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'KICK',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
  ])


  const loggedUser = useSelector((state) => state.redux.auth)
  const session = useSession()
  console.log(session)
      // ask platform
      // ask stream address
      // search and add follows via platforms
      // 
  
  const currentSectionDistributor = (section) => {
    // TODO: read user info and set initial section

    if(section === 'notSupported') {
      return <NotSupported user={loggedUser} setCurrentPage={setCurrentPage} />
    }
    if(section === 'streamingPlatforms') {
      return <AskPlatform user={loggedUser} setCurrentPage={setCurrentPage} platforms={platforms} setPlatforms={setPlatforms}/>
    }
    if(section === 'askPlatformAddress') {
      return <AddStreamerAddress user={loggedUser} setCurrentPage={setCurrentPage} platforms={platforms} setPlatforms={setPlatforms}/>
    }
    if(section === 'streamerIntro') {
      return <AddStreamerInformation user={loggedUser} setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <section className='relative pt-20 flex flex-col justify-center items-center w-screen h-full'>
      <AnimatePresence>
        {currentPage !== 'intro' || currentPage !== 'createNickname' && <GoBackButton key='button' current={currentPage} setCurrentPage={setCurrentPage} />}
        {currentSectionDistributor(currentPage)}
      </AnimatePresence>
    </section>
  );
}
export default Account_Update_Render;