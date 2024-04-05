import { toast } from 'react-hot-toast'
import axios from 'axios'

export const NewPostCollarboration = async (data) => {
  if(data.body.length == 0) {
    toast.error('Your input is empty. Please enter something')
    return false
  }
  try {
    let res = await axios.post('/api/collarboration/newPost', data)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}