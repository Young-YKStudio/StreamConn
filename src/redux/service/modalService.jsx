import { toast } from 'react-hot-toast'
import axios from 'axios'

export const addChannelRequest = async (newChannel) => {
  
  try {
    const res = await axios.post(`/api/createChannel`, newChannel);
    if(res.status === 200) {
      toast.success(`Channel ${newChannel.channelName} has been created`)
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const addTeamChannelRequest = async (newTeamChannel) => {
  
  try {
    const res = await axios.post(`/api/createTeamChannel`, newTeamChannel);
    if(res.status === 200) {
      toast.success(`Team ${newTeamChannel.channelName} has been created`)
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
} 