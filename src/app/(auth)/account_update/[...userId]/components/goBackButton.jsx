import { MdArrowBackIos } from "react-icons/md";

const GoBackButton = ({current, setCurrentPage}) => {

  const goBackHandler = () => {
    if(current === 'streamer') {
      setCurrentPage('intro')
    }
    if(current === 'streamingPlatforms') {
      setCurrentPage('streamer')
    }
    if(current === 'notSupported') {
      setCurrentPage('streamingPlatforms')
    }
    if(current === 'askPlatformAddress') {
      setCurrentPage('streamingPlatforms')
    }
    if(current === 'streamerIntro') {
      setCurrentPage('askPlatformAddress')
    }
    if(current === 'addFollows') {
      setCurrentPage('createNickname')
    }
  }

  return (
    <button 
      onClick={goBackHandler}
      className="absolute top-24 left-8 bg-white/10 p-4 flex justify-center items-center rounded-full hover:bg-white/25"
    >
      <MdArrowBackIos className="pl-1 w-6 h-6" />
    </button>
  );
}
export default GoBackButton;