// 'use client'

// import ProfileRenderContainer from "./components/profileRenderContainer";
// import { Suspense } from 'react'
// import { useSelector } from "react-redux";

// const ChannelProfileServer = ({params}) => {

//   const loggedUser = useSelector((state) => state.redux.auth)
//   const channelUser = params.slug[1]

//   return (
//     <div className="pt-20 px-4 text-white w-full flex justify-center">
//       <Suspense fallback={<p>Loading...</p>}>
//         {loggedUser && <ProfileRenderContainer user={loggedUser} />}
//       </Suspense>
//     </div>
//   );
// }
// export default ChannelProfileServer;