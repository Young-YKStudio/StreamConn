
import axios from 'axios'
import PostLanding from './postLanding'

const getAllPosts = async (channelData) => {
  const response = await axios.post(`${process.env.APP_URL}/api/getAllPosts`, channelData)
  if (response.status == 200) {
    return response.data.message
  } else {
    return 'Error getting initial post data'
  }
}

const ChannelTextPage = async ({ channelData }) => {
  const initAllPosts = await getAllPosts(channelData)

  return (
    <div className='w-full'>
      <p>Channel {channelData.channelName} {channelData.channelOwner} Texts Page</p>
      <PostLanding channelData={channelData} initAllPosts={initAllPosts} />
    </div>
  )
}

export default ChannelTextPage;