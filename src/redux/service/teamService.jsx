import axios from 'axios'
import { toast } from 'react-hot-toast'

// get all Teams
export const getAllTeamsByOwner = async (data) => {
  try {
    let res = await axios.post('/api/getAllTeamsByOwner', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// get all Moderators
export const getAllTeamModerators = async (data) => {
  try {
    let res = await axios.post('/api/getAllTeamModerators', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// add new Team
export const addNewTeam = async (data) => {
  if (data.teamName.length == 0) {
    toast.error('Enter team name')
    return false
  }

  try {
    let res = await axios.post('/api/addNewTeam', data)
    if (res.status === 200) {
      console.log(res)
      toast(`Team ${data.teamName} added.`)
      return res
    }    
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// add new Moderator
export const addTeamModerator = async (data) => {
  if (data.moderatorNickname.length == 0) {
    toast.error('Your input is empty. Please enter name')
    return false
  }

  try {
    let res = await axios.post('/api/addTeamModerator', data)
    if (res.status === 200) {
      return res
    }    
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// remove new Moderator
export const removeTeamModerator = async (data) => {
  try {
    let res = await axios.post('/api/removeTeamModerator', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}
