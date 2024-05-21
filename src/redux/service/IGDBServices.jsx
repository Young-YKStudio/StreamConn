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

  try {
    const res = await axios.post(`/api/getIGDBNewGames`, sendingData)
    console.log(res.data, 'at service')
  } catch (err) {
    toast.error(err.response.data.message)
    return undefined
  }
}