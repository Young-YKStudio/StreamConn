'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

  const router = useRouter()
  // const session = useSession()

  const [ message, setMessage ] = useState('')

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

  const submitHandler = (e, data) => {
    e.preventDefault()
    // await loginAction(data)
    const request = async () => {
      const loginSubmission = await signIn('credentials', {
        redirect: false,
        email: submitForm.email,
        password: submitForm.password
      })
      console.log(loginSubmaission)
    }
    request()
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
        <div className="p-5 py-7 border-t border-slate-500">
          <form className="space-y-4" onSubmit={(e) => submitHandler(e, submitForm)}>
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
            {/* Oauth Buttons */}
          </form>
        </div>
      </div>

    </section>
  );
}
export default LoginPage;