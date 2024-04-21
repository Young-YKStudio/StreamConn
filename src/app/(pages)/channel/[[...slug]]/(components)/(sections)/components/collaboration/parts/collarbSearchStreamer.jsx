const CollarbSearchStreamerPopUp = ({searchedStreamers, selectedStreamers, setSelectedStreamers}) => {

  const streamerClickHandler = (e, streamer) => {
    console.log(streamer, 'clicked')
  }

  if(searchedStreamers) {
    return (
      <div className="bg-sky-950 rounded-lg shadow-lg p-2 flex flex-col text-white overflow-auto scrollbar-thin max-h-48 gap-1">
        {searchedStreamers.length > 0 ? searchedStreamers.map((streamer) => (
          <div
            key={streamer._id + ' collarborationStremaerSearch'}
            className="hover:bg-white/30 px-2 py-0.5 rounded-lg"
            onClick={(e) => streamerClickHandler(e, streamer)}
          >
            <div>
              <p>{streamer.nickname}</p>
            </div>
          </div>
        )) : <p className="text-center text-xs">no search result</p>}
      </div>
    );
  }
}
export default CollarbSearchStreamerPopUp;