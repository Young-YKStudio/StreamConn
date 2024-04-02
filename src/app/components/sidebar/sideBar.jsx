import DisplaySideBar from "./sections/displaySideBar";

const SideBar = async ({session, user}) => {

  return (
    <DisplaySideBar session={session}/>
  )
}

export default SideBar;