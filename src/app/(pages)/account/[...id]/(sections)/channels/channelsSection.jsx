// import { useScroll } from 'framer-motion'
// import LandingComponents from './components/landingComponents'
import axios from 'axios'
import ChannelPosts from './components/channelPosts'

// const getAllPost = async (userId) => {
//   console.log('userId:', userId)
//   const returnedPosts = await axios.get(`${process.env.APP_URL}/api/getallposts/${userId}`)
//   if(returnedPosts) {
//     console.log('RET msg:',returnedPosts.data.message)
//     return returnedPosts.data.message
//   } else {
//     return `${userId} did not call all posts`
//   }
// }

const ChannelsSection = async (params) => {
  // const userId = req.nextUrl.pathname.substr(-24)
  // const userId = params.userId
  const returnedPosts = params.returnedPosts

  // const categoryOpenHandler = () => {
  //   setIsCategorySectionOpen(!isCategorySectionOpen)
  // }
  
  // const categorySectionStyles = (section, boolean) => {
  //   if(section =='firstRow' && boolean) {
  //     return 'absolute top-0 right-0 w-48 bg-blue-900 h-full z-0 pt-24 px-2' 
  //   }
  //   if(section =='firstRow' && !boolean) {
  //     return 'absolute top-0 right-0 bg-blue-900 h-full z-0 pt-24 px-2'
  //   }
  // }
  
  return (
    <div className='flex flex-col justify-end w-full'>
        <div className='w-full'>
          <ChannelPosts returnedPosts={returnedPosts} />
        </div>
    </div>
  );
}

export default ChannelsSection;