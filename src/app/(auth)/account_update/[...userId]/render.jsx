'use client'

import GoBackButton from './components/goBackButton'
import AskStreamer from './components/askStreamer'
import Introduction from './components/introduction'
import AddStreamerAddress from './components/addStreamerAddress'
import AddStreamerInformation from './components/addStreamerInformation'
import CreateNickname from './components/createNickname'
import AskPlatform from './components/askPlatform'
import NotSupported from './components/notsupported'
import { AnimatePresence } from 'framer-motion'

import { useState } from 'react'

const Account_Update_Render = (user) => {

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
      // ask platform
      // ask stream address
      // search and add follows via platforms
      // 
  
  const currentSectionDistributor = (section) => {
    // TODO: read user info and set initial section
    if(section === 'intro') {
      return <Introduction user={user} setCurrentPage={setCurrentPage} />
    }
    if(section === 'streamer') {
      return <AskStreamer user={user} setCurrentPage={setCurrentPage} />
    }
    if(section === 'notSupported') {
      return <NotSupported user={user} setCurrentPage={setCurrentPage} />
    }
    if(section === 'streamingPlatforms') {
      return <AskPlatform user={user} setCurrentPage={setCurrentPage} platforms={platforms} setPlatforms={setPlatforms}/>
    }
    if(section === 'askPlatformAddress') {
      return <AddStreamerAddress user={user} setCurrentPage={setCurrentPage} platforms={platforms} setPlatforms={setPlatforms}/>
    }
    if(section === 'streamerIntro') {
      return <AddStreamerInformation user={user} setCurrentPage={setCurrentPage} />
    }
    if(section === 'createNickname') {
      return <CreateNickname user={user} setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <section className='relative pt-20 flex flex-col justify-center items-center w-screen h-full'>
      <AnimatePresence>
        {currentPage !== 'intro' && <GoBackButton key='button' current={currentPage} setCurrentPage={setCurrentPage} />}
        {currentSectionDistributor(currentPage)}
      </AnimatePresence>
    </section>
  );
}
export default Account_Update_Render;