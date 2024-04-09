import ChannelHomePage from "./components/home/Channel_Home";
import Channel_Collaboration from "./components/collaboration/Channel_Collaboration";
import ChannelParticipation from "./components/participation/Channel_Participation";
import Channel_Text from "./components/text/Channel_Text";

const ChannelSectionLanding = ({channelName, channelData}) => {

  let foundChannel = channelData.channelOwner.channels.find(ch => ch.channelName === channelName)

  if(!foundChannel || channelName === 'home') {
    return <ChannelHomePage foundUser={channelData.channelOwner} />
  }

  if(foundChannel.channelType === 'Text') {
    return <Channel_Text channel={foundChannel} />
  }

  if(foundChannel.channelType === 'Collaboration') {
    return <Channel_Collaboration channel={foundChannel}/>
  }

  if(foundChannel.channelType === 'Participation') {
    return <ChannelParticipation />
  }
}
export default ChannelSectionLanding;