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
}

export const updatePlatformAddress = async (sendingData) => {
  // validation start

  const validationFunc = (platforms) => {
    for (let i =0; i < platforms.length; i++) {
      if(platforms[i].href === '') {
        toast.error('Please fill out all required fields')
        return false;
      }

      if(platforms[i].name === 'Twitch') {
        if(!platforms[i].href.startsWith('https://www.twitch.tv/')) {
          toast.error('Invalid URL address for Twtich')
          return false
        }
      }

      if(platforms[i].name === 'YouTube') {
        if(!platforms[i].href.startsWith('https://www.youtube.com/@')) {
          toast.error('Invalid URL address for YouTube')
          return false
        }
      }

      if(platforms[i].name === 'Chzzk') {
        if(!platforms[i].href.startsWith('https://chzzk.naver.com/')) {
          toast.error('Invalid URL address for Chzzk')
          return false
        }
      }

      if(platforms[i].name === 'Afreeca') {
        if(!platforms[i].href.startsWith('https://bj.afreecatv.com/')) {
          toast.error('Invalid URL address for Afreeca')
          return false
        }
      }

      if(platforms[i].name === 'KICK') {
        if(!platforms[i].href.startsWith('https://kick.com/')) {
          toast.error('Invalid URL address for KICK')
          return false
        }
      }
    }
    return true
  }

  let validation = validationFunc(sendingData.platforms)
  
  if(!validation) {
    return false
  }

  try {
    const res = await axios.put('/api/auth/updatePlatformWithAddress', sendingData)

    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
}