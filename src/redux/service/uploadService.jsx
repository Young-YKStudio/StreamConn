import axios from 'axios'
import { toast } from 'react-hot-toast'

export const imageUploadService = async (file, user) => {
  console.log(file[0], user, 'at service')
  if(!user) {
    toast.error('Please login to upload images')
    return false
  }

  let sendingData = {
    fileData: file[0],
    loggedUser: user
  }

  try {
    const res = await axios.post(`/api/streamConnect/imageUpload`, sendingData)
    if(res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err, 'error at service')
    return false
  }
} 