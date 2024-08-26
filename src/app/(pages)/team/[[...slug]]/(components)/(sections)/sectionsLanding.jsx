import ChannelHomePage from "./components/home/Channel_Home";
import Channel_Collaboration from "./components/collaboration/Channel_Collaboration";
// import ChannelParticipation from "./components/participation/Channel_Participation";
import Channel_Text from "./components/text/Channel_Text";

const TeamSectionLanding = ({ team, teamChannelName }) => {
  if (teamChannelName === 'collaboration') {
    return <Channel_Collaboration team={team} teamChannelName={teamChannelName} />
  }

  // if (teamChannelName === 'participation') {
  //   return <ChannelParticipation channelOwnerNickname={team.teamOwnerNickname} />
  // }

  let foundChannel = team.channels.find(ch => ch.channelName === teamChannelName)

  if (!foundChannel || teamChannelName === 'home') {
    return <ChannelHomePage foundUser={team.teamOwner} />
  }

  if (foundChannel.channelType === 'Text') {
    return <Channel_Text channel={foundChannel} />
  }

  if (team) {
    return (
      <div>
        <p>{ team.teamName }</p>
      </div>
    )
  }

  return <p>not found</p>
  // TODO: render not found section
}
export default TeamSectionLanding;