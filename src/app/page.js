import LandingRender from "./components/pages/landing/page"
import axios from 'axios'

const getAllStreamers = async () => {
  const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)

  if(foundStreamers) {
    return foundStreamers.data.message
  }

  return null
}
export default async function Home() {

  const streamers = await getAllStreamers()

  return (
      <LandingRender streamers={streamers} />
  )
}
