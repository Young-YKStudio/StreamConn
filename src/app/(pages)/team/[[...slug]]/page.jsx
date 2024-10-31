import axios from 'axios'
import { Suspense } from 'react'
import TeamSideBar from './(components)/(parts)/(sidebar)/sideBar';
import TeamProfileBackGround from './(components)/(profileBackground)/profileBackground';
import TeamTabs from './(components)/(tabs)/teamTabs';
import TeamSectionLanding from './(components)/(sections)/sectionsLanding';
import Loading from './(components)/loading';

const getTeamByTeamName = async (reqData) => {
  const team = await axios.post(`${process.env.APP_URL}/api/getTeamByTeamName`, reqData);

  if(team.status === 200) {
    return team.data
  }
}

// team/text or collaboration/teamName
const DynamicTeamPage = async ({params}) => {
  let sendingData = {
    teamChannelName: params.slug[0],
    teamName: params.slug[1],
  }

  const teamData = await getTeamByTeamName(sendingData)
  
  return (
    <div className="flex flex-row flex-nowrap h-full w-full">
      {/* sidebar here */}
      <TeamSideBar />
      <Suspense fallback={<Loading />}>
        <div className="w-full flex flex-col items-center scrollbar-track-sky-950 scrollbar-thumb-white/40">
          <div className='overflow-auto scrollbar-thin w-full h-full flex flex-col items-center'>
            <div className='w-full flex flex-col items-center bg-white/10 pt-24 pb-4 px-4'>
              <TeamProfileBackGround team={teamData} />
            </div>
            <TeamTabs team={teamData} />
            <TeamSectionLanding team={teamData} teamChannelName={sendingData.teamChannelName} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
export default DynamicTeamPage;