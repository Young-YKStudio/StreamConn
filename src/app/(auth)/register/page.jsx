'use client'
// TODO: remove red error text when click register again

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { registerEmail } from '@/redux/service/authService'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'

const Register = () => {

  const [ submitForm, setSubmitForm ] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  })
  const [ message, setMessage ] = useState('')

  const router = useRouter()
  const dispatch = useDispatch()
  const { session, status } = useSession()

  const { email, password, confirmPassword, nickname } = submitForm

  const changeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if(status==='authenticated') {
      return router.push('/account_update/welcome')
    }
  },[status])

  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(setIsLoadingTrue())

    let registerRequest = await registerEmail(submitForm)
    if(registerRequest) {
      dispatch(setIsLoadingFalse())
      return router.push('/account_update/welcome')
    }
    dispatch(setIsLoadingFalse())
  }

  const inputLabelStyle = 'block mb-2 text-xs font-medium'
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
              <label htmlFor='nickname' className={inputLabelStyle}>Username</label>
              <input type='text' name='nickname' className={inputBoxStyle} placeholder='Enter your username' required value={nickname} onChange={changeHandler}/>
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
              <button type='submit' className='w-full bg-sky-900 hover:bg-sky-700 font-medium rounded-md text-sm px-5 py-2.5 text-center'>Reigster</button>
              {message !== '' && <p className='text-red-500 italic text-center text-xs'>{message}</p>}
              <div className='flex flex-row gap-2 text-sm justify-center'>
                <p>Already registered?</p>
                <Link href='/login' className='text-yellow-400 hover:text-sky-500'>Login</Link>
              </div>

              {/* TODO: find account */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;