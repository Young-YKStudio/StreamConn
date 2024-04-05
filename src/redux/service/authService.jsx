import { signOut, signIn } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const signInOauth = async (provider) => {
  await signIn(provider, {callbackUrl: '/'})
}

export const logOut = async () => {
  await signOut()
  return true
}

export const setNewReduxAuth = async (userId) => {
  try {
    const res = await axios.get(`/api/findOneUser/${userId}`)
    if(res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const signInEmail = async (loginData) => {

  
  try {
    const loginAttemp = await signIn('credentials', {
      redirect: false,
      email: loginData.email,
      password: loginData.password
    })
    
    if(loginAttemp.status !== 200) {
      return toast.error('Please check your email and password?')
    }
    
    if(loginAttemp.status === 200) {
      return window.history.pushState({}, '', '/')
    }
  } catch (err) {
    return toast.error('Please check your email and password')
  }
  
}