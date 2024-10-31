'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { tabButtonStyles, userValidator, channelTypeButtonStyles, channelTypeButtonIcons } from '../(parts)/(sharedFunctions)/teamSharedFunctions'
import { MdAdd, MdHome, MdPeopleAlt, MdCoPresent, MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import AddTeamChannelModal from './addTeamChannelModal';
import TeamListsPopUp from './teamListPopUp';
import { useSelector } from 'react-redux';

const TeamTabs = ({team, channels}) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ tabOpen, setTabOpen ] = useState('')

  const router = useRouter()

  const selectChangeHandler = (e, string) => {
    router.push(`/team/${string}/${team.teamName}`)
  }
  
  const tabButtonHandler = (e, string) => {
    router.push(`/team/${string}/${team.teamName}`)
  }
  
  const currentUser = useSelector((state) => state.redux.auth)

  let tabTypes

  if(team) {
    if(team.channels) {
      const types = team.channels.map((channel) => channel.channelType)
      const filteredTypes = types.filter((type, index) => types.indexOf(type) === index)
      tabTypes = filteredTypes
    }
  }

  const tabOpenChanger = (e, tabType, state) => {
    if(state === tabType) {
      return setTabOpen('')
    }
    return setTabOpen(tabType)
  }

  const collaborationButtonHandler = (e) => {
    return router.push(`/team/collaboration/${team.teamName}`)
  }

  const participationButtonHandler = (e) => {
    return router.push(`/team/participation/${team.teamName}`)
  }
  
  const tabButtonDistributor = (tabType, channels, state) => {
    if(tabType === 'Text') {
      return (
        <div className='relative' key={tabType + 'tabtypes'} >
          <button onClick={(e) => tabOpenChanger(e, tabType, state)} className={channelTypeButtonStyles(tabType, state)} >
            {channelTypeButtonIcons(tabType)}{tabType} {tabOpen === tabType ? <MdKeyboardArrowUp className='w-5 h-5'/> : <MdKeyboardArrowDown className='w-5 h-5' />}
          </button>
          {tabOpen === tabType && <TeamListsPopUp tabType={tabType} channels={channels} team={team} />}
        </div>
      )
    }

    if(tabType === 'Collaboration') {
      return (
        <button className={channelTypeButtonStyles(tabType, state)} onClick={collaborationButtonHandler} key={tabType + 'tabtypes'} >
          {channelTypeButtonIcons(tabType)} {tabType}
        </button>
      )
    }

    if(tabType === 'Participation') {
      return (
        <button className={channelTypeButtonStyles(tabType, state)} onClick={participationButtonHandler} key={tabType + 'tabtypes'} >
          {channelTypeButtonIcons(tabType)} {tabType}
        </button>
      )
    }
  }
  
  return (
    <nav className="flex flex-row gap-2 w-full max-w-4xl justify-center sm:justify-start border-b border-sky-500 py-4 px-4 pt-8">

      {/* responsive select */}
      <div className='sm:hidden w-full max-w-sm flex flex-row gap-4'>
        <label htmlFor='tabs' className='sr-only'>Choose a team</label>
        <select id='tabs' 
          name='tabs'
          className="block w-full rounded-md border-none bg-white/20 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-0 focus:ring-inset focus:ring-sky-500 sm:text-sm"
          value={team.teamName}
          onChange={(e) => selectChangeHandler(e, e.target.value)}
        >
          { team.channels.map((tab) => (
            <option key={tab.channelName + 'tabs option with responsive'}>
              {tab.channelName}
            </option>
          ))}
        </select>

        <button className="px-4 py-2 bg-sky-950 hover:bg-sky-800 rounded-md"><MdAdd className="w-5 h-5 text-bold"/></button>
      </div>

      {/* tabs */}
      <div className='hidden sm:flex sm:flex-row sm:justify-between w-full'>
        <div className="flex flex-wrap gap-4">
          <button
            className='rounded-md px-3 py-1.5 font-medium bg-sky-950 hover:bg-sky-800 flex flex-row gap-2 items-center'
            onClick={(e) => router.push(`/team/home/${team.teamName}`)}
            >
            <MdHome className="w-5 h-5"/>Home
          </button>
          {tabTypes.length > 0 && tabTypes.map((tab) => (
            tabButtonDistributor(tab, team.channels, tabOpen)
          ))}
        </div>
        
        <div>
          {currentUser && userValidator(currentUser, team.teamOwner) &&
            <button className="px-3 py-2 bg-sky-950 rounded-md hover:bg-sky-800" onClick={(e) => setIsModalOpen(true)} ><MdAdd className="w-5 h-5 text-bold" /></button>
          }
        </div>
      </div>

      {/* modal */}
      {isModalOpen && <AddTeamChannelModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} teamUser={team.teamOwner} currentUser={currentUser} team={team} />}

    </nav>
  );
}
export default TeamTabs;

// TODO: add click handler on responsive add button