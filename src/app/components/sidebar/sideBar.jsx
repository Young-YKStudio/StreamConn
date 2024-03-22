import DisplaySideBar from "./sections/displaySideBar";
// import { useState, useEffect } from 'react'
import axios from 'axios'

const SideBar = async ({session, user}) => {

  return (
    <DisplaySideBar session={session}/>
  )
}

export default SideBar;