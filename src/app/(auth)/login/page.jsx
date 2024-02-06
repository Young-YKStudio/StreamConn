'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";


const LoginPage = () => {

  const router = useRouter()
  // const providers = await getProviders()
  // const session = useSession()
  
  const [ message, setMessage ] = useState('')
  const [ providers, setProviders ] = useState()
  const [ credentialOpen, setCredentialOpen ] = useState(false)
  const { session, sessionStatus } = useSession()
  
  useEffect(() => {
    (() => {
      const res = getProviders().then((result) => {
        setProviders(result.google)
      })
    })()
  },[])

  const inputLabelStyle = 'block mb-2 text-sm font-medium'
  const inputBoxStyle = 'bg-slate-500 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-2 focus:bg-slate-300 focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5'

  const [ submitForm, setSubmitForm ] = useState({
    email: '',
    password: ''
  })

  const { email, password } = submitForm

  const changeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = async (e, data) => {
    e.preventDefault()
    // await loginAction(data)
    const email = submitForm.email
    const password = submitForm.password

    const response = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    })

    if(response) {
      console.log(response, sessionStatus, 'at response')
    }
  }

  const credentialOpenHandler = (e) => {
    setCredentialOpen(!credentialOpen)
  }

  return (
    <section className="flex justify-center items-center w-full px-4 pt-24">
      <div className="relative rounded-md shadow bg-slate-800 w-full max-w-sm lg:max-w-md">
        <div className="flex flex-col items-center p-7">
          <h3 className="text-xl font-semibold">
            Login Account
          </h3>
        </div>

        {/* body */}
        <div className="flex flex-col gap-4 p-5 py-7 border-t border-slate-500">
          {/* Oauth Buttons */}
          <div className='flex items-center justify-center pt-2'>
            {providers && <button className='flex gap-2 items-center p-2 bg-white/20 w-full justify-center rounded-md hover:bg-white/50' onClick={() => signIn(providers.id)}><FcGoogle className='w-5 h-5' />Sign in with {providers.name}</button>}
          </div>
          <div className='flex items-center justify-center pt-2'>
            <button className='flex gap-2 items-center p-2 bg-white/20 w-full justify-center rounded-md hover:bg-white/50' onClick={() => credentialOpenHandler()}><MdOutlineEmail className='w-5 h-5' />Sign in with Email</button>
          </div>
          {credentialOpen &&
            <form className="space-y-4 pt-4" onSubmit={(e) => submitHandler(e, submitForm)}>
              {/* Forms */}
              <div>
                <label htmlFor="email" className={inputLabelStyle}>Email</label>
                <input type='email' name='email' className={inputBoxStyle} placeholder="Enter your email address" required value={email} onChange={changeHandler} />
              </div>
              <div>
                <label htmlFor="password" className={inputLabelStyle}>Password</label>
                <input type='password' name='password' className={inputBoxStyle} placeholder="Enter your password" required value={password} onChange={changeHandler} />
              </div>

              {/* button */}
              <div className='flex flex-col gap-4 pt-2'>
                <button type='submit' className='w-full bg-sky-900 hover:bg-sky-500 font-medium rounded-md text-sm px-5 py-2.5 text-center'>Login</button>
              </div>
            </form>
          
          }
        </div>
      </div>

    </section>
  );
}
export default LoginPage;