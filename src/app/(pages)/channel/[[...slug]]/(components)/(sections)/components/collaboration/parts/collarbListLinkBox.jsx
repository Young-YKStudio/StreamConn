const CollarbListLinkBox = ({list, selectedCollaraborationIndex, setSelectedCollaraborationIndex}) => {

  const boxClickHandler = (e, index) => {
    return setSelectedCollaraborationIndex(index)
  }

  const buttonDistributor = (selectedIndex, linkIndex, link) => {
    if(selectedIndex === linkIndex) {
      return <div
        key={link._id + ' leftsideLinks'}
        className='p-2 rounded-lg shadow-lg bg-sky-900 flex justify-between items-center flex-nowrap'
      >
        <p className="truncate">{link.channelName}</p>
        <p>({link.collarborations.length})</p>
      </div>
    }

    return <div
      key={link._id + ' leftsideLinks'}
      onClick={(e) => boxClickHandler(e, linkIndex)}
      className="p-2 rounded-lg shadow-lg bg-white/20 hover:bg-sky-800 hover:cursor-pointer flex flex-nowrap justify-between items-center"
    >
      <p className="truncate">{link.channelName}</p>
      <p>({link.collarborations.length})</p>
    </div>
  }


  if(list) {

    console.log(list, 'at list')

    return (
      <div className="h-full scrollbar-track-sky-950 pl-2 scrollbar-thumb-white/40">
        <div className="text-sm p-2 pt-4 font-bold">
          <p>Collaborations</p>
        </div>
        <div className='flex flex-col gap-2 p-2 overflow-auto scrollbar-thin text-sm'>
          {list.map((link, i) => (
            buttonDistributor(selectedCollaraborationIndex, i, link)
          ))}
        </div>
      </div>
    )
  }
}

export default CollarbListLinkBox