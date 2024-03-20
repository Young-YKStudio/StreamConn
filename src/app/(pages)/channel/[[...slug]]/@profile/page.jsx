import ProfileRenderContainer from "./components/profileRenderContainer";
import axios from 'axios'
import { Suspense } from 'react'

const getUserInfo = async (user) => {
  try {
    let response = await axios.get(`${process.env.APP_URL}/api/findOneUser/${user}`)
    if(response) {
      return response.data.message
    } 
  } catch (err) {
    return 'error'
  }
}

const ChannelProfileServer = async ({params}) => {

  let userId = params.slug[1]
  const user = await getUserInfo(userId)

  return (
    <div className="pt-20 px-4 text-white w-full flex flex-col items-center">
      <Suspense fallback={<p>Loading...</p>}>
        <ProfileRenderContainer user={user} />
      </Suspense>
    </div>
  );
}
export default ChannelProfileServer;