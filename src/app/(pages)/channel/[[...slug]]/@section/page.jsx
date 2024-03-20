import ChannelHomePage from "./components/home/Channel_Home"
import ChannelTextPage from "./components/text/Channel_Text"

const ChannelSectionPage = ({params}) => {

  const channelUrl = params.slug[0]

  const sectionDistributor = (url) => {
    if(url === 'home') {
      return <ChannelHomePage />
    }
    if(url !== 'home' || url !== 'event' || url !== 'coop') {
      return <ChannelTextPage />
    }
  }

  return (
    <>
      {sectionDistributor(channelUrl)}
    </>
  );
}
export default ChannelSectionPage;