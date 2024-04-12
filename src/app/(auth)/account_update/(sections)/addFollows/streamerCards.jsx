import { MdPerson } from "react-icons/md";
import { FaTwitch, FaYoutube } from "react-icons/fa6";
import { chzzkLogo } from '@/app/data/logoLinks';
import Image from 'next/image';
import afreecaImage  from '../../../../../images/afreecaTV_logo_rgb_light_symbol.png'
import kickImage from '../../../../../images/Kick-logo-green-k.png'
import { followStreamer, unfollowStreamer } from "@/redux/service/followAndSubscribe";
import { useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse, setForceAuthUpdate } from "@/redux/slice";
import { useRouter } from "next/navigation";

const platformIconsDistributor = (platform) => {

  if(platform.name === 'Twitch') {
    return <FaTwitch className='w-3 h-3 text-purple-600' />
  }
  if(platform.name === 'YouTube') {
    return <FaYoutube className='w-3 h-3 text-red-600' />
  }
  if(platform.name === 'Chzzk') {
    return <img src={chzzkLogo} className='w-3 h-3 rounded-full'/>
  }
  if(platform.name === 'Afreeca') {
    return <Image src={afreecaImage} alt='afreeca logo' className='w-3 h-3' />
  }
  if(platform.name === 'KICK') {
    return <Image src={kickImage} alt='kick logo' className='w-3 h-3' />
  }
}

const StreamerCards = ({loggedUser, streamer}) => {

  const dispatch = useDispatch()
  const router = useRouter()

  const followButtonHandler = async (e, streamer) => {

    dispatch(setIsLoadingTrue())

    let sendingData = {
      channelOwner: streamer,
      loggedUser: loggedUser,
    }

    let followRequest = await followStreamer(sendingData)

    if(followRequest) {
      dispatch(setIsLoadingFalse())
      console.log( 'at card success')
      return window.location.reload()
    }

    return dispatch(setIsLoadingFalse())
  }

  const unfollowButtonHandler = async (e, streamer) => {
    dispatch(setIsLoadingTrue())

    let sendingData = {
      channelOwner: streamer,
      loggedUser: loggedUser,
    }

    let unfollowRequest = await unfollowStreamer(sendingData)

    if(unfollowRequest) {
      dispatch(setIsLoadingFalse())
      console.log( 'at card success')
      return window.location.reload()
    }

    return dispatch(setIsLoadingFalse())
  }

  const followButtonDistributor = (streamer) => {
    if(loggedUser) {
      let followedStreamer = loggedUser.follows.find((streamer) => streamer._id === loggedUser._id)
      // 이게 잘못 된것 같은데...
      // let foundFollow = await streamer.followers.find((follow) => follow._id === loggedUser._id)
      if(followedStreamer) {
        return <button onClick={(e) => unfollowButtonHandler(e, streamer)} className="text-xs bg-white/20 px-2 py-1 rounded-md hover:bg-sky-900">unfollow</button>
      }
  
      return <button onClick={(e) => followButtonHandler(e, streamer)} className="text-xs bg-white/20 px-2 py-1 rounded-md hover:bg-sky-900">Follow</button>
    }
  }

  return (
    <div className="grid grid-cols-5 p-2">
      <div className="flex flex-row items-center gap-2 col-span-4">
        {/* profile picture */}
        {streamer.profile?
          <img src={streamer.profile} alt={streamer.nickname + ' profileFound'} className='w-7 h-7 rounded-full' />
          :
          <div
            className="min-w-7 h-7 rounded-full flex justify-center items-center bg-sky-950"
          >
            <MdPerson className="w-5 h-5" />
          </div> 
        }

        {/* username and follow number */}
        <div>
          <p className="text-sm font-semibold">{streamer.nickname}</p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xs">{streamer.followers.length} followers</p>
            {streamer.platforms.length > 0 ?
              <div className="flex flex-row flex-nowrap gap-1 bg-white/90 px-2 py-1 rounded-full">
                {streamer.platforms.length > 0 && streamer.platforms.map((platform) => (
                  <div
                    key={platform.name + streamer._id}
                    className="flex flex-row flex-nowrap gap-1.5 items-center"
                  >
                    {platformIconsDistributor(platform)}
                  </div>
                ))}
              </div>
              :
              null
            }
          </div>
        </div>

      </div>

      <div className="flex flex-row justify-end items-center col-span-1">
        {followButtonDistributor(streamer)}
      </div>
    </div>
  );
}
export default StreamerCards;