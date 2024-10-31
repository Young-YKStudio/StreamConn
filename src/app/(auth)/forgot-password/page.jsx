'use client'

import { useState } from 'react'

const ForgotPassword = () => {

  const [ submittedForm, setSubmittedFrom ] = useState({
    findingEmail: '',
    findingEmailConfirm: '',
  })

  const [ errorMessage, setErrorMessage ] = useState('')

  const { findingEmail, findingEmailConfirm } = submittedForm

  const submitFormHandler = (e) => {
    setSubmittedFrom((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // submitted email and confirm email are not same

    if(findingEmail !== findingEmailConfirm) {
      return setErrorMessage('Provided emails do not match')
    }

    console.log('submit button clicked')
    // error handling from backend
    // error 1 : submitted email is not valid
    // error 3 : backend service is not available

    // if no error, send request to backend to find password
    // after getting password, redirect user to reset password page
    // if error, show error message to user

    // clear form
  }

  return (
    <section className="flex justify-center items-center h-full w-full px-4 pt-12 bg-yellow-200">
      <div className="relative rounded-md shadow bg-zinc-800 w-full max-w-sm lg:max-w-md text-white ring-4 ring-sky-400">
        <div className="flex flex-col items-center p-7">
          <h3 className="text-xl font-semibold">
            Find your password
          </h3>
        </div>

        {/* body */}
        <form className="flex flex-col gap-4 p-5" onSubmit={(e) => submitHandler(e)}>
          <div>
            <p className='text-xs'>email address</p>
            <input 
              type='email' 
              className='rounded-md w-full text-zinc-800 text-sm font-normal' 
              placeholder='enter your email address'
              value={findingEmail}
              name='findingEmail'
              onChange={(e) => submitFormHandler(e)}
            />
          </div>
          <div>
            <p className='text-xs'>confirm your email address</p>
            <input 
              type='email' 
              className='rounded-md w-full text-zinc-800 text-sm font-normal' 
              placeholder='confirm your email address'
              value={findingEmailConfirm}
              name='findingEmailConfirm'
              onChange={(e) => submitFormHandler(e)}
            />
          </div>
          <button type='submit'>submit</button>
        </form>
      </div>

    </section>
  )
}

export default ForgotPassword