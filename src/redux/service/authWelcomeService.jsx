import axios from 'axios'
import { toast } from 'react-hot-toast'
import { usernameValidator } from '@/app/(pages)/channel/[[...slug]]/(components)/(parts)/(sharedFunctions)/channelSharedFunctions'

export const updateAskStreamer = async (sendingData) => {
  try {
    const res = await axios.put('/api/auth/updateIsStreamer', sendingData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const updateUsername = async (sendingData) => {

  let error = usernameValidator(sendingData.nickname)

  if(error) {
    return false
  }

  try {
    const res = await axios.put('/api/auth/updateNickname', sendingData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const updateStreamerIntro = async (sendingData) => {
  if(sendingData.input === '') {
    toast.error('Introduction cannot be empty')
    return false
  }

  try {
    const res = await axios.put('/api/auth/updateStreamerIntro', sendingData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const updateIsUpdated = async (sendingData) => {
  try {
    const res = await axios.put('/api/auth/updateIsUpdated', sendingData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}

export const updateNewPlatform = async (sendingData) => {
  try {
    const res = await axios.put('/api/auth/updatePlatform', sendingData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
  return true
}