import DisplaySideBar from "./sections/displaySideBar";
// import { useState, useEffect } from 'react'
import axios from 'axios'

const SideBar = async ({session, user}) => {

  // const [ displayingStreamers, setDisplayingStreamers ] = useState()

  // useEffect(() => {

  // },[session])
  console.log(session.data.user.id, 'at sidebar server side')

  return (
    <DisplaySideBar session={session}/>
  )
}

export default SideBar;