import ChannelHomePage from "./components/home/Channel_Home";
import Channel_Collaboration from "./components/collaboration/Channel_Collaboration";
import ChannelParticipation from "./components/participation/Channel_Participation";
import Channel_Text from "./components/text/Channel_Text";
import SettingPreload from './components/setting/SettingPreload'


const ChannelSectionLanding = ({channelName, channelData, channel, channelOwnerNickname}) => {
  let foundChannel = channelData.channelOwner.channels.find(ch => ch.channelName === channelName)
  
  if(channel==='collaboration') {
    return <Channel_Collaboration channelOwnerNickname={channelOwnerNickname} />
  }

  if(channel==='participation') {
    return <ChannelParticipation channelOwnerNickname={channelOwnerNickname} />
  }

  if(channel==='setting') {
    return <SettingPreload channelOwnerNickname={channelOwnerNickname} channel={channelData} />
  }
  
  if(!foundChannel || channelName === 'home') {
    return <ChannelHomePage foundUser={channelData.channelOwner} />
  }
  
  if(foundChannel.channelType === 'Text') {
    return <Channel_Text channel={foundChannel} />
  }
  
  return <p>not found</p>
  // TODO: render not found section
}
export default ChannelSectionLanding;