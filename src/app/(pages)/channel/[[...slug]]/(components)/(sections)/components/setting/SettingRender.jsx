'use client'
import { useSelector } from "react-redux";
import ChannelOwnerSettings from "./components/ChannelOwnerSettings";

const SettingRender = ({channel}) => {

  const loggedUser = useSelector((state) => state.redux.auth)

  // console.log(channel)

  // if no channel ownerdata

  if(!channel) {
    return <p>Loading...</p>
  }

  // if not logged in
  if(!loggedUser) {
    return <p>You need to be logged in to view this page.</p>
  }

  // if logged user is the channel owner,
  return (
    <ChannelOwnerSettings channel={channel}/>
  )
  
  // if logged user is not the MOD,
  
  // let moderator = channel.channelOwner.moderators.find((mod) => )

}

export default SettingRender;