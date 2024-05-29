import axios from 'axios'
import { toast } from 'react-hot-toast'

export const getIGDBToken = async () => {
  try {
    const res = await axios.get(`/api/getIGDBToken`);
    if(res.status === 200) {
      return res.data
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const getNewGames = async (token) => {

  let sendingData = {
    token: token
  }

  let returningObj = {
    status: 200,
    data: undefined
  }

  try {
    const res = await axios.post(`/api/getIGDBNewGames`, sendingData)
    if(res.status === 200) {
      returningObj.status = 200
      returningObj.data = res.data
      return returningObj
    }
  } catch (err) {
    console.log(err.response.status, 'error at service')
    // toast.error(err.response.data.message)
    let statuscode = err.response.status

    if(statuscode === 408) {
      returningObj.status = 408
      return returningObj
    }

    if(statuscode === 409) {
      returningObj.status = 409
      return returningObj
    }

    return undefined
  }
}

export const initialMongoEntry = async (token) => {

  let returningObj = {
    status: 200,
    data: undefined
  }

  try {
    const res = await axios.post(`/api/postIGDBToken`, { token: token })
    returningObj.data = res.data
    console.log(returningObj, 'at service')
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const getOneGame = async (gameSlug, gameId) => {
  console.log(gameSlug, gameId, 'at service')

  try {
    const res = await axios.post(`/api/getOneGameData`, { slug: gameSlug, gameId: gameId })
    console.log(res, 'at service')
  } catch (err) {
    console.log(err)
  }
}

