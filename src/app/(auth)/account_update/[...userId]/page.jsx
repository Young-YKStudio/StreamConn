import axios from 'axios'
import Account_Update_Render from './render'

export const getUserInfo = async (userId) => {
  const foundUser = await axios.get(`${process.env.APP_URL}/api/findOneUser/${userId.userId}`)
  
  if(foundUser) {
    return foundUser.data.message
  }

  return null
}

export const getAllStreamers = async () => {
  const foundStreamers = await axios.get(`${process.env.APP_URL}/api/getAllStreamers`)
  
  if(foundStreamers) {
    return foundStreamers.data.message
  }

  return null
}

const Account_Update = async ({params}) => {

  const foundUser = await getUserInfo(params)
  const allStreamers = await getAllStreamers()

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Account_Update_Render user={foundUser} allStreamers={allStreamers} />
    </div>
  );
}
export default Account_Update;