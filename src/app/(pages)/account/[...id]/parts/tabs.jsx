import { MdAdd } from "react-icons/md";
import { Fragment, useState } from 'react'
import { channels, tabButtonStyles } from "../components/sharedFunctions";
import AddChannelModal from "../components/AddChannelModal";

const SectionTabs = ({currentSection, setCurrentSection, user}) => {

  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const selectChangeHandler = (e, string) => {
    setCurrentSection(string)
  }
  
  const tabButtonHandler = (e, string) => {
    setCurrentSection(string)
  }

  return (
    <nav className="flex flex-row gap-2 w-full max-w-4xl justify-between sm:justify-start border-b border-sky-500 py-4 pt-8">

      {/* responsive select */}
      <div className='sm:hidden w-full max-w-sm flex flex-row gap-4'>
        <label htmlFor='tabs' className='sr-only'>
          Choose a channel
        </label>
        <select
          id='tabs'
          name='tabs'
          className="block w-full rounded-md border-none bg-white/20 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-0 focus:ring-inset focus:ring-sky-500 sm:text-sm"
          value={currentSection}
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
          {channels.map((tab) => (
            <button
              key={tab.name + 'tabsWide'}
              className={tabButtonStyles(currentSection, tab.name)}
              onClick={e => tabButtonHandler(e, tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div>
          <button className="px-3 py-2 bg-sky-950 rounded-md hover:bg-sky-800"><MdAdd className="w-5 h-5 text-bold" onClick={(e) => setIsModalOpen(true)} /></button>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && <AddChannelModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user} />}
    </nav>
  );
}
export default SectionTabs;