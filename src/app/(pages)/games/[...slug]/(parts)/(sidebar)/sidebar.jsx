import axios from 'axios'
import GameSideBarRender from './sideBarRender'
import { Suspense } from 'react'

const getAllStreamers = async () => {
  const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)

  if(foundStreamers) {
    return foundStreamers.data.message
  }

  return null
}

const GameSideBar = async () => {

  const streamers = await getAllStreamers()
  return (
    <Suspense fallback={<p className='pt-24'></p>}>
      <GameSideBarRender streamers={streamers} />
    </Suspense>
  );
}
export default GameSideBar;