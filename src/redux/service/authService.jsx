import { signOut, signIn } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { usernameValidator } from '@/app/(pages)/channel/[[...slug]]/(components)/(parts)/(sharedFunctions)/channelSharedFunctions'

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
      toast.error('Please check your email and password?')
      return false
    }
    
    if(loginAttemp.status === 200) {
      return true
    }
  } catch (err) {
    toast.error('Unexpected error at login. Please try again')
    return false
  }
}

export const registerEmail = async (registerData) => {
  const { email, nickname, password, confirmPassword } = registerData

  if(password !== confirmPassword) {
    return toast.error('Please check your passwords')
  }

  if(password.length < 6) {
    return toast.error('Password must be at least 6 characters')
  }

  if(nickname.length < 2) {
    return toast.error('Username must be at least 2 characters')
  }

  if(nickname.length > 16) {
    return toast.error('Username must be less than 16 characters')
  }

  let validateError = usernameValidator(nickname)

  if(validateError) {
    return false
  }

  const loginAfterRegister = async () => {
    try {
      const loginAttempt = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password
      })

      if(loginAttempt.status !== 200) {
        toast.error('Unexpected error at login. Please try login later')
        return false
      }

      return true
    } catch (err) {
      toast.error('Unexpected error at login. Please try login later')
      return false
    }
  }

  try {
    const registerRequest = await axios.post('/api/register', registerData)
    if(registerRequest.status === 200) {
      let login = await loginAfterRegister()
      if(login) {
        return true
      }
      return false
    }
  } catch (e) {
    toast.error(e.response.data)
    return false
  }
}

export const sendTestEmail = async (userId) => {

  let sendingData = {
    from: 'service@streamconn.com',
    to: 'kys3923@gmail.com',
  }

  try {
    let res = await axios.post('/api/testEmailSend', sendingData)
    return true
  } catch (err) {
    toast.error('Error sending test email')
    return false
  }
}

export const FindPasswordService = async (submittedForm) => {
  const { findingEmail, findingEmailConfirm } = submittedForm

  if(findingEmail !== findingEmailConfirm) {
    toast.error('Please check your emails again. Provided emails do not match.')
    return 'emailsDoNotMatch'
  }

  let sendingData = {
    findingEmail: findingEmail
  }

  try {
    let res = await axios.post('/api/forgotPassword', sendingData)
    return res.data
  } catch (err) {
    toast.error(err.response.data.error)
    return false
  }
}

export const updatePassword = async (submittedForm) => {
  console.log(submittedForm, 'from serivce')

  const { userId, newPassword, confirmPassword } = submittedForm

  if(newPassword !== confirmPassword) {
    toast.error('Please check your passwords. Passwords do not match.')
    return false
  }

  let sendingData = {
    userId: userId,
    newPassword: newPassword
  }

  try {
    let res = await axios.put('/api/updatePassword', sendingData)
    console.log(res, 'from serivce return')
    return true
  } catch (err) {
    toast.error(err.response.data.error)
    return false
  }
}