import axios from 'axios'
import { toast } from 'react-hot-toast'

export const followStreamer = async (data) => {
  try {
    let res = await axios.post('/api/addFollow', data)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}