import { useScroll } from 'framer-motion'
// import LandingComponents from './components/landingComponents'
import axios from 'axios'
import PostBoard from './components/postBoard'

const getAllPost = async (userId) => {
  const returnedPosts = await axios.get(`${process.env.APP_URL}/api/getallposts/${userId}`)
  if(returnedPosts) {
    return returnedPosts.data.message
  } else {
    return `${userId} did not call all posts`
  }
}

const AccountIndividualPage = async ({params}) => {
  const returnedPosts = await getAllPost(params.id)

  const categoryOpenHandler = () => {
    setIsCategorySectionOpen(!isCategorySectionOpen)
  }

  const categorySectionStyles = (section, boolean) => {
    if(section =='firstRow' && boolean) {
      return 'absolute top-0 right-0 w-48 bg-blue-900 h-full z-0 pt-24 px-2' 
    }
    if(section =='firstRow' && !boolean) {
      return 'absolute top-0 right-0 bg-blue-900 h-full z-0 pt-24 px-2'
    }
  }

  return (
    <div className='flex flex-col justify-end w-full'>

      {/* right side channel section */}
      {/* <div className={categorySectionStyles('firstRow', isCategorySectionOpen)}> */}
        {/* first row */}
        {/* <div className='flex flex-row flex-nowrap justify-between'>
          {isCategorySectionOpen && 
            <p className='py-1 text-normal'>Channels</p>
          }
          <button onClick={categoryOpenHandler}>{isCategorySectionOpen ? 'Close' : 'Open'}</button>
        </div> */}

        {/* channel lists */}
        {/* {loopedTopics.length > 0 && loopedTopics.map((loop) => {
          if(loop.channel === 'Notice') {
            return <p key={loop.id}>#Notice</p>
          }
          if(loop.channel === 'Gallery'){
            return <p key={loop.id}>#Gallery</p>
          }
          if(loop.channel === 'Suggestions'){
            return <p key={loop.id}>#Gallery</p>
          }
          if(loop.channel !== 'Notice' || loop.channel !== 'Gallery' || loop.channel !== 'Suggestions') {
            return <p key={loop.id}>#{loop.channel}</p>
          }
        })} */}

      {/* </div> */}
      
      {/* breadcrumbs section */}

        <div className='w-full'>
          {/* <RenderingPosts returnedPosts={returnedPosts}/>
          <div>
          </div>
          <PostInput />           */}
          { <PostBoard returnedPosts={returnedPosts}/> }
        </div>
    </div>
  );
}

export default AccountIndividualPage;
