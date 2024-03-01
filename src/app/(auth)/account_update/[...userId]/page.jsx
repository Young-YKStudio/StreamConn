import axios from 'axios'
import Account_Update_Render from './render'

export const getUserInfo = async (userId) => {
  const foundUser = await axios.get(`${process.env.APP_URL}/api/findOneUser/${userId.userId}`)
  
  if(foundUser) {
    return foundUser.data.message
  }

  return null
}

const Account_Update = async ({params}) => {

  const foundUser = await getUserInfo(params)

  return (
    <div>
      <Account_Update_Render user={foundUser}/>
      <p className="pt-20">account update page {foundUser.email}</p>
      {/* ask platform */}
      {/* ask stream address */}
    </div>
  );
}
export default Account_Update;