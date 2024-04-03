import ChannelHomePage from "./components/home/Channel_Home";
import Channel_Collaboration from "./components/collaboration/Channel_Collaboration";
import ChannelParticipation from "./components/participation/Channel_Participation";

const ChannelSectionLanding = ({channelName, channelOwner}) => {

  let foundChannel = channelOwner.channels.find(ch => ch.channelName === channelName)

  if(!foundChannel || channelName === 'home') {
    return <ChannelHomePage foundUser={channelOwner} />
  }

  if(foundChannel.channelType === 'Text') {
    return <p>Please move your components here</p>
  }

  if(foundChannel.channelType === 'Collaboration') {
    return <Channel_Collaboration />
  }

  if(foundChannel.channelType === 'Participation') {
    return <ChannelParticipation />
  }
}
export default ChannelSectionLanding;