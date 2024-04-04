import axios from 'axios'
import { Suspense } from 'react'
import ChannelSideBar from './(components)/(parts)/(sidebar)/sideBar';
import ChannelProfileBackGround from './(components)/(profileBackground)/profileBackground';
import ChannelTabs from './(components)/(tabs)/channelTabs';
import ChannelSectionLanding from './(components)/(sections)/sectionsLanding';
import { channel } from 'diagnostics_channel';

const getCurrentChannel = async (reqData) => {
  const channel = await axios.post(`${process.env.APP_URL}/api/getCurrentChannel`, reqData);

  if(channel.status === 200) {
    return channel.data
  }
}

const DynamicChannelPage = async ({params}) => {
  
  let sendingData = {
    channel: params.slug[0],
    channelOwner: params.slug[1],
  }

  const channelData = await getCurrentChannel(sendingData)
  
  return (
    <div className="flex flex-row flex-nowrap h-full w-full">
      {/* sidebar here */}
      <ChannelSideBar />
      <Suspense fallback={<p>Loading...</p>}>
        <div className="w-full flex flex-col items-center">
          <div className='w-full flex flex-col items-center bg-white/10 pt-24 pb-4 px-4'>
            <ChannelProfileBackGround channelOwner={channelData.channelOwner} channel={sendingData.channel}/>
          </div>
          <ChannelTabs channelOwner={channelData.channelOwner} channelName={sendingData.channel}/>
          <ChannelSectionLanding channelName={sendingData.channel} channelOwner={channelData.channelOwner}/>
        </div>
      </Suspense>
    </div>
  );
}
export default DynamicChannelPage;