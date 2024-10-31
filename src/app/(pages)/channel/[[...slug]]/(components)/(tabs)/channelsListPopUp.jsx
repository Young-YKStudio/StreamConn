import Link from "next/link"

const ChannelListsPopUp = ({tabType, channels, channelOwner}) => {
  
  let currentChannel

  if(channels) {
    if(channels.length > 0) {
      currentChannel = channels.filter(channel => channel.channelType === tabType)
    }
  }

  if(currentChannel.length > 0) {
    return (
      <div
        className="absolute top-12 left-0 bg-sky-800 rounded-md shadow-md scrollbar-track-sky-950 scrollbar-thumb-white/40 py-2 z-20"
      >
        <div className="flex flex-row flex-wrap gap-2 px-2 max-h-[15em] overflow-auto scrollbar-thin">
          {currentChannel.map(channel => (
            <Link 
              href={`/channel/${channel.channelName}/${channelOwner.nickname}`}
              key={channel.channelName + tabType + ' key'}
              className="px-4 py-1 hover:bg-sky-950 rounded-md truncate w-full"
            >
              {channel.channelName}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
export default ChannelListsPopUp;