import LoadingComponent from "@/app/components/loading/loadingComponent";
import IndividualPageIntro from "./parts/Introduction";
import LeftSideBar from "./parts/leftSideBar";
import IndividualRenderContainer from "./parts/renderContainer";
import { Suspense } from "react";
import axios from 'axios'

const getUserInfo = async (user) => {
  try {
    let response = await axios.get(`${process.env.APP_URL}/api/findOneUser/${user}`)
    if(response) {
      return response.data.message
    }
  } catch (error) {
    return 'error'
  }
}

const getAllStreamers = async () => {
  const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)

  if(foundStreamers) {
    return foundStreamers.data.message
  }

  return null
}

const AccountLanding = async ({params}) => {
  
  const userId = params.id
  const user = await getUserInfo(userId)
  const streamers = await getAllStreamers()

  // TODO: set most of the site functionality here(합방, 이벤트 등등)
  return (
    <div className="flex flex-row flex-nowrap h-full">
      <Suspense fallback={<LoadingComponent />}>
        <LeftSideBar streamers={streamers} user={user} />
        <IndividualRenderContainer user={user}/>
        {/* <IndividualPageIntro user={user}/> */}
      </Suspense>
    </div>
  );
}
export default AccountLanding;