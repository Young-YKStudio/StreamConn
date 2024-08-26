import { MdAdd } from 'react-icons/md'

const CollarbListLinkBox = ({list, selectedCollaraborationIndex, setSelectedCollaraborationIndex, isEventAddModal, setIsEventAddModal, addCollaborationChannel, setAddCollaborationChannel}) => {

  const boxClickHandler = (e, index) => {
    return setSelectedCollaraborationIndex(index)
  }

  const addCollaborationButton = (e, channel) => {
    setAddCollaborationChannel(channel)
    setIsEventAddModal(!isEventAddModal)
  }

  const buttonDistributor = (selectedIndex, linkIndex, link) => {
    if(selectedIndex === linkIndex) {
      return <div
        key={link._id + ' leftsideLinks'}
        className='p-2 rounded-lg shadow-lg bg-sky-900 flex justify-between items-center flex-nowrap w-full'
      >
        <p className="truncate">{link.channelName}</p>
        <button
          className='p-1 hover:bg-white/20 rounded-lg'
          onClick={(e) => addCollaborationButton(e, link)}
        >
          <MdAdd className='w-4 h-4'/>
        </button>
      </div>
    }

    return <div
      key={link._id + ' leftsideLinks'}
      onClick={(e) => boxClickHandler(e, linkIndex)}
      className="p-2 rounded-lg shadow-lg bg-white/20 hover:bg-sky-800 hover:cursor-pointer flex flex-nowrap justify-between items-center w-full"
    >
      <p className="truncate">{link.channelName}</p>
      <button
        className='p-1 hover:bg-white/20 rounded-lg'
        onClick={(e) => addCollaborationButton(e, link)}
      >
        <MdAdd className='w-4 h-4'/>
      </button>
    </div>
  }


  if(list) {

    return (
      <div className="h-full scrollbar-track-sky-950 pl-2 scrollbar-thumb-white/40">
        <div className="text-sm p-2 pt-4 font-bold">
          <p>Collaborations</p>
        </div>
        <div className='flex flex-col gap-2 p-2 overflow-auto scrollbar-thin text-sm w-full'>
          {list.map((link, i) => (
            buttonDistributor(selectedCollaraborationIndex, i, link)
          ))}
        </div>
      </div>
    )
  }
}

export default CollarbListLinkBox