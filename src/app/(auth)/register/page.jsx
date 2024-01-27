'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Register = () => {

  const [ submitForm, setSubmitForm ] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [ message, setMessage ] = useState('')

  const router = useRouter()

  const { email, password, confirmPassword } = submitForm

  const changeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      return setMessage('Please check your passwords')
    }

    if(password.length < 6) {
      return setMessage('Password must be at least 6 characters')
    }

    try {
      // TODO: add Pending state
      const request = await axios.post('api/register', submitForm)
      // TODO: login with successed email and token 
      if(request.status === 200) {
        console.log(request)
      } 
      // TODO: set error msg in message state
      if(request.status !== 200) {
        console.log('error')
      }
    } catch (e) {
      setMessage('Please try again')
      console.log(e)
    }

    console.log('submit triggered')
  }

  const inputLabelStyle = 'block mb-2 text-sm font-medium'
  const inputBoxStyle = 'bg-slate-500 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-2 focus:bg-slate-300 focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5'

  return (
    <div className='flex justify-center items-center w-full px-4 pt-24'>
      <div className='relative rounded-md shadow bg-slate-800 w-full max-w-sm lg:max-w-md'>
        <div className='flex flex-col items-center p-7'>
          <h3 className='text-xl font-semibold'>
            Register Account
          </h3>
        </div>

        {/* body */}
        <div className='p-5 py-7 border-t border-slate-500'>
          <form className='space-y-4' onSubmit={submitHandler}>
            <div>
              <label htmlFor='email' className={inputLabelStyle}>Email</label>
              <input type='email' name='email' className={inputBoxStyle} placeholder='Enter your email address' required value={email} onChange={changeHandler}/>
            </div>
            <div>
              <label htmlFor='password' className={inputLabelStyle}>Password</label>
              <input type='password' name='password' className={inputBoxStyle} placeholder='Enter Password' required value={password} onChange={changeHandler}/>
            </div>
            <div>
              <label htmlFor='password' className={inputLabelStyle}>Confirm Password</label>
              <input type='password' name='confirmPassword' className={inputBoxStyle} placeholder='Confirm Password' required value={confirmPassword} onChange={changeHandler}/>
            </div>
            <div className='flex flex-col gap-4 pt-2'>
              <button type='submit' className='w-full bg-sky-900 hover:bg-sky-500 font-medium rounded-md text-sm px-5 py-2.5 text-center'>Reigster</button>
              {message !== '' && <p className='text-red-500 italic text-center text-xs'>{message}</p>}
              <div className='flex flex-row gap-2 text-sm'>
                <p>Already registered?</p>
                <Link href='/login' className='text-sky-700 hover:text-sky-500'>Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;