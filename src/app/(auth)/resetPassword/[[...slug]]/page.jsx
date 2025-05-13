import axios from 'axios'
import TokenExpiredPage from './(parts)/tokenExpired'
import TokenValidPage from './(parts)/tokenValid'

const getLandingData = async (reqData) => {
  const request = await axios.post(`${process.env.APP_URL}/api/resetPasswordLanding`, reqData)

  if (request.status === 200) {
    return request.data
  }
}

const ResetPasswordLanding = async ({params}) => {

  let sendingData = {
    userId: params.slug[0],
    token: params.slug[1],
  }

  const landingData = await getLandingData(sendingData)

  if(landingData) {
    return (
      <div className='flex justify-center items-center h-full w-full px-4 pt-12 bg-yellow-200'>
        {landingData.tokenStatus ?
          <TokenValidPage user={landingData.user}/>
          :
          <>
            <TokenExpiredPage user={landingData.user}/>
          </>
        }
      </div>
    )
  }

}

export default ResetPasswordLanding;