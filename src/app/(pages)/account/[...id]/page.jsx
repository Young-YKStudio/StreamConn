import SideBar from "@/app/components/sidebar/sideBar";
import LoadingComponent from "@/app/components/loading/loadingComponent";
import IndividualPageIntro from "./parts/Introduction";
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

const AccountLanding = async ({params}) => {
  
  const userId = params.id
  const user = await getUserInfo(userId)

  // TODO: set most of the site functionality here(합방, 이벤트 등등)
  return (
    <div className="flex flex-row flex-nowrap">
      <SideBar />
      <Suspense fallback={<LoadingComponent />}>
        <IndividualPageIntro user={user}/>
      </Suspense>
    </div>
  );
}
export default AccountLanding;