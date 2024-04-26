import CollaborationRender from "./collaborationRender";
import { Suspense } from "react";
import Loading from "../../../loading";
import axios from 'axios'

const getPopulatedChannelData = async (channelOwnerNickname) => {

  let sendingData = {
    data: channelOwnerNickname
  }
  try {
    let request = await axios.post(`${process.env.APP_URL}/api/collarboration/getPopulatedData`, sendingData) 
    if(request.status == 200) {
      return request.data
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

const Channel_Collaboration = async ({channelOwnerNickname}) => {

  let channelData = await getPopulatedChannelData(channelOwnerNickname)

  return (
    <Suspense fallback={<Loading />}>
      <CollaborationRender channel={channelData} />
      {/* TODO: add error handler if api call returns false */}
    </Suspense>
  );
}
export default Channel_Collaboration;