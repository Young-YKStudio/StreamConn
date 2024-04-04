import axios from 'axios'
import { toast } from 'react-hot-toast'

export const followStreamer = async (data) => {
  try {
    let res = await axios.post('/api/addFollow', data)
    if(res.status === 200) {
      toast(`Following ${data.channelOwner.nickname}`)
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const unfollowStreamer = async (data) => {
  try {
    let res = await axios.post('/api/unFollow', data)
    if(res.status === 200) {
      toast(`Unfollowed ${data.channelOwner.nickname}`)
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}