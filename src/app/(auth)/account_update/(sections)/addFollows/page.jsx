import AddFollowsRender from "./addFollows";
import { Suspense } from "react";
import LoadingAccountUpdateFollow from "./loading";
import axios from 'axios'

const getAllStreamers = async () => {
  try {
    const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)

    if(foundStreamers.status === 200) {
      return foundStreamers.data.message
    }

  } catch (err) {
    return false
  }
}

const WelcomeAddFollow = async () => {

  const allStremaers = await getAllStreamers()

  return (
    <Suspense fallback={<LoadingAccountUpdateFollow />}>
      <AddFollowsRender allStreamers={allStremaers} />
    </Suspense>
  );
}
export default WelcomeAddFollow;