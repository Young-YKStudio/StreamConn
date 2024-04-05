import HeaderRender from "./header/headerRender"
import axios from 'axios'

const getAllStreamers = async () => {
  
  try {
    const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)
    if(foundStreamers.status === 200) {
      return foundStreamers.data.message
    }
  } catch (err) {
    return null
  }
}

const HeaderLanding = async () => {

  const streamers = await getAllStreamers()

  return (
    <HeaderRender allStreamers={streamers}/>
  );
}
export default HeaderLanding;