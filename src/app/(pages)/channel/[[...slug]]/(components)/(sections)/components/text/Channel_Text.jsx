import axios from 'axios'
import { Suspense } from "react"
import Loading from '../../../loading'
import TextRender from './textRender'

const getAllPosts = async (channelId) => {
  const requestData = {
    channelId: channelId,
  }

  const response = await axios.post(`${process.env.APP_URL}/api/text/getPopulatedData`, requestData)
  if (response.status == 200) {
    return response.data
  } else {
    return 'Error getting initial post data'
  }
}

const Channel_Text = async ({ channel }) => {
  const initChannelData = await getAllPosts(channel._id)

  return (
    <Suspense fallback={<Loading />}>
      <TextRender channel={initChannelData} />
    </Suspense>
  )
}
export default Channel_Text;