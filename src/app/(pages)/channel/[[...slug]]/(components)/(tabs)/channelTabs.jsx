'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { tabButtonStyles, userValidator, channelTypeButtonStyles, channelTypeButtonIcons } from '../(parts)/(sharedFunctions)/channelSharedFunctions'
import { MdAdd, MdHome, MdPeopleAlt, MdCoPresent, MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import AddChannelModal from './addChannelModal';
import ChannelListsPopUp from './channelsListPopUp';
import { useSelector } from 'react-redux';
import { tabBlueButton, tabSelectButton } from '@/app/components/buttons/buttonStyles';

const ChannelTabs = ({channelOwner, channelName}) => {

  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ tabOpen, setTabOpen ] = useState('')

  const router = useRouter()

  const selectChangeHandler = (e, string) => {
    router.push(`/channel/${channelOwner.nickname}/${string}`)
  }
  
  const tabButtonHandler = (e, string) => {
    router.push(`/channel/${channelOwner._id}/${string}`)
  }
  
  const currentUser = useSelector((state) => state.redux.auth)

  let tabTypes

  if(channelOwner) {
    if(channelOwner.channels) {
      const types = channelOwner.channels.map((type) => type.channelType)
      const filteredTypes = types.filter((type, index) => types.indexOf(type) === index)
      tabTypes = filteredTypes
    }
  }
  'rounded-md px-3 py-1.5 font-medium bg-sky-950 hover:bg-sky-800 flex flex-row gap-2 items-center'

  const tabOpenChanger = (e, tabType, state) => {
    if(state === tabType) {
      return setTabOpen('')
    }

    return setTabOpen(tabType)
  }

  const collaborationButtonHandler = (e) => {
    return router.push(`/channel/${channelOwner.nickname}/collaboration`)
  }

  const participationButtonHandler = (e) => {
    return router.push(`/channel/${channelOwner.nickname}/participation`)
  }

  
  const tabButtonDistributor = (tabType, channels, state) => {

    if(tabType === 'Text') {
      return (
        <div 
          className='relative'
          key={tabType + 'tabtypes'}
        >
          <button 
            onClick={(e) => tabOpenChanger(e, tabType, state)}
            className={channelTypeButtonStyles(tabType, state)}
          >
            {channelTypeButtonIcons(tabType)}{tabType} {tabOpen === tabType ? <MdKeyboardArrowUp className='w-5 h-5'/> : <MdKeyboardArrowDown className='w-5 h-5' />}
          </button>
          {tabOpen === tabType && <ChannelListsPopUp tabType={tabType} channels={channels} channelOwner={channelOwner}/>}
        </div>
      )
    }

    if(tabType === 'Collaboration') {
      return <button
        className={channelTypeButtonStyles(tabType, state)}
        onClick={collaborationButtonHandler}
        key={tabType + 'tabtypes'}
      >
        {channelTypeButtonIcons(tabType)} {tabType}
      </button>
    }

    if(tabType === 'Participation') {
      return <button
        className={channelTypeButtonStyles(tabType, state)}
        onClick={participationButtonHandler}
        key={tabType + 'tabtypes'}
      >
        {channelTypeButtonIcons(tabType)} {tabType}
      </button>
    }
  }
  
  return (
    <nav className="flex flex-row gap-2 w-full max-w-4xl justify-center sm:justify-start border-sky-500 py-4 px-4 md:pt-4 pt-5 sticky top-16 z-20 bg-white">

      {/* responsive select */}
      <div className='sm:hidden w-full flex flex-row justify-between items-center flex-nowrap gap-4 bg-sky-400'>
        <div>
          <p>Channel Info</p>
        </div>
        <div className='flex flex-row flex-nowrap gap-4 w-full'>
          <label htmlFor='tabs' className='sr-only'>
            Choose a channel
          </label>
          <select
            id='tabs'
            name='tabs'
            className={tabSelectButton}
            value={channelName}
            onChange={(e) => selectChangeHandler(e, e.target.value)}
          >
            {channelOwner.channels.map((tab) => (
              <option key={tab.channelName + 'tabs option with responsive'}>
                {tab.channelName}
              </option>
            ))}
          </select>

          <button className={tabBlueButton}><MdAdd className="w-5 h-5 text-bold"/></button>
        </div>

      </div>

      {/* tabs */}
      <div className='hidden sm:flex sm:flex-row sm:justify-between w-full'>
        <div className="flex flex-wrap gap-4">
          <button
            className={tabBlueButton}
            onClick={(e) => router.push(`/channel/${channelOwner.nickname}/home`)}
            >
            <MdHome className="w-5 h-5"/>Home
          </button>
          {tabTypes.length > 0 && tabTypes.map((tab) => (
            tabButtonDistributor(tab, channelOwner.channels, tabOpen)
          ))}
        </div>
        
        <div>
          {currentUser && userValidator(currentUser, channelOwner) &&
            <button className={tabBlueButton} onClick={(e) => setIsModalOpen(true)} ><MdAdd className="w-5 h-5 text-bold" /></button>
          }
        </div>
      </div>

      {/* modal */}
      {isModalOpen && <AddChannelModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} channelUser={channelOwner} currentUser={currentUser} />}

    </nav>
  );
}
export default ChannelTabs;