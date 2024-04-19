import axios from 'axios'
import { toast } from 'react-hot-toast'

// add post
export const addPost = async (data) => {
  if (data.input.length == 0) {
    toast.error('Your input is empty. Please enter something')
    return false
  }

  try {
    let res = await axios.post('/api/text/addPost', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// edit post
export const editPost = async (data) => {
  if (data.input.length == 0) {
    toast.error('Your input is empty. Please enter something')
    return false
  }

  try {
    let res = await axios.put('/api/text/editPost', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// delete post
export const deletePost = async (data) => {
  try {
    let res = await axios.put('/api/text/deletePost', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// add comment
export const addComment = async (data) => {
  if (data.input.length == 0) {
    toast.error('Your input is empty. Please enter something')
    return false
  }

  try {
    let res = await axios.post('/api/text/addComment', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}

// edit comment
export const editComment = async (data) => {
  if (data.input.length == 0) {
    toast.error('Your input is empty. Please enter something')
    return false
  }

  try {
    let res = await axios.put('/api/text/editComment', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response)
    console.log('ERR:', err.response)
    return false
  }
}

// delete comment
export const deleteComment = async (data) => {
  try {
    let res = await axios.put('/api/text/deleteComment', data)
    if (res.status === 200) {
      return res
    }
  } catch (err) {
    toast.error('Error: ' + err.response.data.message)
    return false
  }
}
