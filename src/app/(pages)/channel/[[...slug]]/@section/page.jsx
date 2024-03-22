import ChannelHomePage from "./components/home/Channel_Home"
import ChannelTextPage from "./components/text/Channel_Text"
import Channel_Collaboration from "./components/collaboration/Channel_Collaboration"
import ChannelParticipation from "./components/participation/Channel_Participation"
import axios from 'axios'

const getUserWithChannels = async (userId, channelName) => {
  let sendingData = {
    userId: userId,
    channelName: channelName
  }

  try {
    let response = await axios.post(`${process.env.APP_URL}/api/getAllTabs`, sendingData)
    if(response) {
      return response.data
    }
  } catch (err) {
    return null
  }
}


const ChannelSectionPage = async ({params}) => {

  const channelName = params.slug[0]
  const channelUser = params.slug[1]

  const foundUser = await getUserWithChannels(channelUser, channelName)

  const sectionDistributor = (user, channel) => {
    let foundChannel = user.channels.find(ch => ch.channelName === channel)
    if(!foundChannel || channel ==='home') {
      return <ChannelHomePage foundUser={foundUser} />
    }
    if(foundChannel.channelType === 'Text') {
      return <ChannelTextPage />
    }
    if(foundChannel.channelType === 'Collaboration') {
      return <Channel_Collaboration />
    }
    if(foundChannel.channelType === 'Participation') {
      return <ChannelParticipation />
    }
  }

  return (
    <>
      {sectionDistributor(foundUser, channelName)}
    </>
  );
}
export default ChannelSectionPage;