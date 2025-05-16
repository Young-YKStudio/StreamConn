import axios from 'axios'
import { Suspense } from 'react'
import ChannelSideBar from './(components)/(parts)/(sidebar)/sideBar';
import ChannelProfileBackGround from './(components)/(profileBackground)/profileBackground';
import ChannelTabs from './(components)/(tabs)/channelTabs';
import ChannelSectionLanding from './(components)/(sections)/sectionsLanding';
import Loading from './(components)/loading';

const getCurrentChannel = async (reqData) => {
  const channel = await axios.post(`${process.env.APP_URL}/api/getCurrentChannel`, reqData);

  if(channel.status === 200) {
    return channel.data
  }
}

const DynamicChannelPage = async ({params}) => {
  
  let sendingData = {
    channel: params.slug[1],
    channelOwnerNickname: params.slug[0],
  }

  const channelData = await getCurrentChannel(sendingData)
  
  return (
    <div className="relative flex flex-row flex-nowrap h-full w-full">
      {/* sidebar here */}
      {/* <ChannelSideBar /> */}
      <Suspense fallback={<Loading />}>
        <div className="w-full flex flex-col items-center scrollbar-track-sky-950 scrollbar-thumb-white/40">
          <div className='overflow-auto scrollbar-thin w-full h-full flex flex-col items-center'>
            <div className='w-full flex flex-col items-center bg-yellow-200 pt-24 pb-4 px-4 pl-24'>
              <ChannelProfileBackGround channelOwner={channelData.channelOwner} channel={sendingData.channel}/>
            </div>
            <div className='md:pl-24 sticky md:top-0 top-8 z-30 w-full flex justify-center border-sky-400 border-t-4 '>
              <ChannelTabs channelOwner={channelData.channelOwner} channelName={sendingData.channel}/>
            </div>
            <div className='md:pl-20 flex justify-center w-full bg-white'>
              <ChannelSectionLanding channelName={sendingData.channel} channelData={channelData} channel={sendingData.channel} channelOwnerNickname={sendingData.channelOwnerNickname} />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
export default DynamicChannelPage;