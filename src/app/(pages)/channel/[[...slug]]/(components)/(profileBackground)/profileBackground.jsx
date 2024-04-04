'use client'
import { TbHttpConnect } from "react-icons/tb";
import { MdPerson } from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux";
import { setIsLoadingTrue, setIsLoadingFalse } from "@/redux/slice";
import { useState } from 'react'

import { ImageDistributor, accountNotLoggedEvent, followButtonStyle, profileButtonDistributor } from "../(parts)/(sharedFunctions)/channelSharedFunctions";

const ChannelProfileBackGround = ({channelOwner}) => {

  const [ isEditModal, setIsEditModal ] = useState(false)

  let loggedUser = useSelector((state) => state.redux.auth)

  const setModalOn = () => {
    console.log('setting modal on')
  }

  const addFollowFunction = () => {
    console.log('triggered')
  }

  const addSubscriptionFunction = () => {
    console.log('adding subscription function')
  } 

  return (
    <section className="flex flex-col md:flex-row justify-between w-full max-w-4xl pt-8">
      {/* Left Side */}
      <div className="flex flex-row gap-4 items-center">
        {/* Image */}
        {channelOwner.profile ? <img src={channelOwner.profile} alt='streamer logo' className="w-20 h-20 rounded-full" /> : <div className="bg-sky-950 rounded-full p-2"><MdPerson className="h-16 w-16" /></div>}

        {/* streamer info */}
        <div>
          {/* nickname and icon */}
          <div className="flex flex-row gap-2 items-center">
            <p className="tracking-wide font-bold text-2xl">{channelOwner.nickname}</p>
            <div className="px-2 border border-sky-500 rounded-lg">
              <TbHttpConnect className="w-6 h-6 text-sky-500 "/>
            </div>
          </div>

          {/* follows */}
          <div className="flex flex-row items-center gap-4 font-light">
            <p className="text-sm">{channelOwner.followers && channelOwner.followers.length} <span className="text-slate-400">Followers</span></p>
            {/* add event number? */}
            <p> | </p>
            <div className="flex flex-row gap-3 items-center">
              {channelOwner.platforms && channelOwner.platforms.map((platform) => (
                <div key={platform.name + channelOwner.nickname}>
                  {ImageDistributor(platform)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="pt-6">
        {profileButtonDistributor(loggedUser, channelOwner, setModalOn, addFollowFunction, addSubscriptionFunction)}
      </div>
      {/* <div className="flex items-baselineh h-full gap-2">
        {!loggedUser && <p>not logged in</p>}
        <button>follow</button>
        <button>Subscribe</button>
      </div> */}
    </section>
  );
}
export default ChannelProfileBackGround;