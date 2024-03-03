import DisplaySideBar from "./sections/displaySideBar";

// get streamers from api

const SideBar = async ({session}) => {

  return (
    <DisplaySideBar session={session}/>
  )
}

export default SideBar;