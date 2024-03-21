'use client'

import { MdAdd } from "react-icons/md";
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import AddChannelModal from "../../components/addChannelModal";

export const channels = [
  {name: 'Event'},
  {name: 'ChannelOne'},
]

export const tabButtonStyles = (currentSection, channel) => {
  if(currentSection !== channel) {
    return 'text-gray-400 hover:text-white px-3 py-1.5 truncate'
  }
  if(currentSection === channel) {
    return 'rounded-md px-3 py-1.5 font-medium bg-sky-800'
  }
}

const TabRenderContainer = ({channelUser, channelName}) => {

  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const router = useRouter()
  
  const selectChangeHandler = (e, string) => {
    router.push(`/channel/${string}/${channelUser}`)
  }
  
  const tabButtonHandler = (e, string) => {
    router.push(`/channel/${string}/${channelUser}`)
  }

  return (
    <nav className="flex flex-row gap-2 w-full max-w-4xl justify-center sm:justify-start border-b border-sky-500 py-4 pt-8">

      {/* responsive select */}
      <div className='sm:hidden w-full max-w-sm flex flex-row gap-4'>
        <label htmlFor='tabs' className='sr-only'>
          Choose a channel
        </label>
        <select
          id='tabs'
          name='tabs'
          className="block w-full rounded-md border-none bg-white/20 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-0 focus:ring-inset focus:ring-sky-500 sm:text-sm"
          value={channelName}
          onChange={(e) => selectChangeHandler(e, e.target.value)}
        >
          {channels.map((tab) => (
            <option key={tab.name + 'tabs'}>
              {tab.name}
            </option>
          ))}
        </select>

        <button className="px-4 py-2 bg-sky-950 hover:bg-sky-800 rounded-md"><MdAdd className="w-5 h-5 text-bold"/></button>
      </div>

      {/* tabs */}
      <div className='hidden sm:flex sm:flex-row sm:justify-between w-full'>
        <div className="flex flex-wrap gap-4">
          <button
            className={tabButtonStyles(channelName, 'home')}
            onClick={(e) => router.push(`/channel/home/${channelUser}`)}
          >
            Home
          </button>
          {channels.map((tab) => (
            <button
              key={tab.name + 'tabsWide'}
              className={tabButtonStyles(channelName, tab.name)}
              onClick={e => tabButtonHandler(e, tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <button className="px-3 py-2 bg-sky-950 rounded-md hover:bg-sky-800" onClick={(e) => setIsModalOpen(true)} ><MdAdd className="w-5 h-5 text-bold" /></button>
      </div>

      {/* modal */}
      {isModalOpen && <AddChannelModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} channelUser={channelUser} />}

    </nav>
  );
}
export default TabRenderContainer;


// TODO: add click handler on responsive add button