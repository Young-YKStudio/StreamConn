import HeaderRender from "./header/headerRender"
import axios from 'axios'
import { Suspense } from "react"
import LoadingComponent from '@/app/components/loading/loadingComponent'

const getAllStreamers = async () => {
  
  try {
    const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)
    if(foundStreamers.status === 200) {
      return foundStreamers.data.message
    }
  } catch (err) {
    return null
  }
}

const HeaderLanding = async () => {


  const streamers = await getAllStreamers()

  return (
    <Suspense fallback={<LoadingComponent />}>
      <HeaderRender allStreamers={streamers}/>
    </Suspense>
  );
}
export default HeaderLanding;