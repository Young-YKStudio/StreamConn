import CollaborationRender from "./collaborationRender";
import { Suspense } from "react";
import Loading from "../../../loading";
import axios from 'axios'

const getPopulatedChannelData = async (teamChannelName) => {

  let sendingData = {
    teamName: teamChannelName
  }

  try {
    let request = await axios.post(`${process.env.APP_URL}/api/getTeamCollabsByTeamName`, sendingData) 
    if(request.status == 200) {
      return request.data
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

const Channel_Collaboration = async ({team, teamChannelName}) => {
  let teamChannelsData = await getPopulatedChannelData(team.teamName)
  if (!teamChannelsData) {
    return
  }

  return (
    <Suspense fallback={<Loading />}>
      <CollaborationRender channel={teamChannelsData} />
      {/* TODO: add error handler if api call returns false */}
    </Suspense>
  );
}
export default Channel_Collaboration;