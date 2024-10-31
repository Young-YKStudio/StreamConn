import axios from 'axios'
import { Suspense } from 'react'
import { SocketSideBarLanding } from './socketSideBar/SocketSideBarLanding'

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

const SideBarServerSide = async () => {

  const streamers = await getAllStreamers()

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <SocketSideBarLanding allStreamers={streamers}/>
    </Suspense>
  )
}

export default SideBarServerSide;