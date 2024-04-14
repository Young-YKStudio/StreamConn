import CollaborationRender from "./collaborationRender";
import { Suspense } from "react";
import Loading from "../../../loading";
import axios from 'axios'

const getPopulatedChannelData = async (channel) => {

  let sendingData = {
    data: channel
  }
  try {
    let request = await axios.post(`${process.env.APP_URL}/api/collarboration/getPopulatedData`, sendingData) 
    if(request.status == 200) {
      return request.data
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

const Channel_Collaboration = async ({channel}) => {

  let channelData = await getPopulatedChannelData(channel)

  return (
    <Suspense fallback={<Loading />}>
      <CollaborationRender channel={channelData} />
    </Suspense>
  );
}
export default Channel_Collaboration;