'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { updatePassword } from '@/redux/service/authService'
import { useRouter } from 'next/navigation'

const TokenValidPage = ({user}) => {

  const [ submitForm, setSubmitForm ] = useState({
    enteredPassword: '',
    confirmedPassword: ''
  })

  const { enteredPassword, confirmedPassword } = submitForm

  const dispatch = useDispatch()
  const router = useRouter()

  const submitFormHandler = (e) => {

    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const validate = () => {
      if(enteredPassword === '' || confirmedPassword === '') {
        return false
      }
      return true
    }

    let validation = validate()

    if(validation) { 
      dispatch(setIsLoadingTrue())

      let submitData = {
        userId: user._id,
        newPassword: enteredPassword,
        confirmPassword: confirmedPassword,
      }
      
      let updatePasswordRequest = await updatePassword(submitData)

      if(updatePasswordRequest) {
        dispatch(setIsLoadingFalse())
        return router.push('/login')
      }

      dispatch(setIsLoadingFalse())
      return setSubmitForm({
        enteredPassword: '',
        confirmedPassword: ''
      })
    }

  }

  return (
    <div className="relative rounded-md shadow bg-zinc-800 w-full max-w-sm lg:max-w-md text-white ring-4 ring-sky-400">
      <div className="flex flex-col items-center p-7">
        <h3 className="text-xl font-semibold">
          Enter new password
        </h3>
      </div>

      {/* body */}
      <form className="flex flex-col gap-4 p-5 pb-7" onSubmit={(e) => submitHandler(e)}>
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs'>Enter new password</p>
          <input 
            type='password' 
            className='rounded-md w-full text-zinc-800 text-sm font-normal' 
            placeholder='Enter new password'
            value={enteredPassword}
            minLength='6'
            name='enteredPassword'
            onChange={(e) => submitFormHandler(e)}
          />
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs'>Confirm your new password</p>
          <input 
            type='password' 
            className='rounded-md w-full text-zinc-800 text-sm font-normal' 
            placeholder='confirm your new password'
            value={confirmedPassword}
            minLength='6'
            name='confirmedPassword'
            onChange={(e) => submitFormHandler(e)}
          />
        </div>
        <button type='submit' className='w-full bg-sky-400 text-white p-2 rounded-md hover:bg-sky-700 my-1'>Submit</button>
      </form>

    </div>  
  )
}

export default TokenValidPage