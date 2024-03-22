// call channels
import TabRenderContainer from "./components/tabRenderContainer";
import { Suspense } from "react";
import axios from 'axios'

const getUserAndChannel = async (userId, channelName) => {
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
    return 'error'
  }
}

const ChannelTabs = async ({params}) => {

  const channelUser = params.slug[1]
  const channelName = params.slug[0]

  const allTabs = await getUserAndChannel(channelUser, channelName)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TabRenderContainer channelUser={channelUser} channelName={channelName} foundUser={allTabs} />
    </Suspense>
  );
}
export default ChannelTabs;