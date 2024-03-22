import axios from 'axios'
import { Suspense } from 'react'
import SidebarRenderContainer from './components/renderContainer'

const getAllStreamers = async () => {
  const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)

  if(foundStreamers) {
    return foundStreamers.data.message
  }

  return null
}

const LeftSideBar = async ({params}) => {

  const userId = params.slug[1]
  const streamers = await getAllStreamers()

  return (
    <div className='flex flex-row flex-nowrap h-full'>
      <Suspense fallback={<p>loading...</p>}>
        <SidebarRenderContainer streamers={streamers} />
      </Suspense>
    </div>
  );
}
export default LeftSideBar;