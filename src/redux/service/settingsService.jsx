import axios from 'axios'
import { toast } from 'react-hot-toast'

// get all Moderators
export const getAllModerators = async (data) => {
  try {
    let res = await axios.post('/api/getAllModerators', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// add new Moderator
export const addModerator = async (data) => {
  if (data.moderatorNickname.length == 0) {
    toast.error('Your input is empty. Please enter something')
    return false
  }

  try {
    let res = await axios.post('/api/addModerator', data)
    if (res.status === 200) {
      return res
    }    
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// remove new Moderator
export const removeModerator = async (data) => {
  try {
    let res = await axios.post('/api/removeModerator', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// updateChannelSettings

export const updateChannelSettings = async (data) => {
  try {
    let res = await axios.post('/api/updateChannelPrivacy', data)
    if (res.status === 200) {
      return res.data.channels
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// deleteChannel

export const deleteChannel = async (data) => {
  try {
    let res = await axios.post('/api/deleteChannel', data)
  } catch (err) {
    return false
  }
}
