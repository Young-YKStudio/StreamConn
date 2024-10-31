import axios from 'axios'
import TeamSideBarRender from './sideBarRender'
import { Suspense } from 'react'

const getAllStreamers = async () => {
  const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)

  if(foundStreamers) {
    return foundStreamers.data.message
  }

  return null
}

const TeamSideBar = async () => {

  const streamers = await getAllStreamers()
  return (
    <Suspense fallback={<p className='pt-24'></p>}>
      <TeamSideBarRender streamers={streamers} />
    </Suspense>
  );
}
export default TeamSideBar;