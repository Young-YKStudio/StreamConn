'use client'

import ProfileRenderContainer from "./components/profileRenderContainer";
import { Suspense } from 'react'
import { useSelector } from "react-redux";

const ChannelProfileServer = () => {

  const loggedUser = useSelector((state) => state.redux.auth)
  
  return (
    <div className="pt-20 px-4 text-white w-full flex justify-center">
      <Suspense fallback={<p>Loading...</p>}>
        {loggedUser && <ProfileRenderContainer user={loggedUser} />}
      </Suspense>
    </div>
  );
}
export default ChannelProfileServer;