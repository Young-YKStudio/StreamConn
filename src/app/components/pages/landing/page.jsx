import LandingRender from './landingRender'
import axios from 'axios';
import { Suspense } from 'react'

const getAllStreamers = async () => {
  try {
    const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)
    if(foundStreamers.status === 200) {
      return foundStreamers.data.message
    }
  } catch (e) {
    return null
  }
}

const LandingServer = async () => {

  const streamers = await getAllStreamers()

  // const newGames = await getIGDBData()
  // TODO: Error handler here
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <LandingRender allStreamers={streamers}/>
    </Suspense>
  );
}
export default LandingServer;