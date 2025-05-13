'use client'
import { useState } from 'react'
import { FindPasswordService } from '@/redux/service/authService'
import { useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { useRouter } from 'next/navigation'
import { MdCheck } from "react-icons/md";
import { blueButtonLight } from '@/app/components/buttons/buttonStyles'

const ForgotPassword = () => {

  const [ submittedForm, setSubmittedForm ] = useState({
    findingEmail: '',
    findingEmailConfirm: '',
  })
  const [ emailSent, setEmailSent ] = useState(false)

  const { findingEmail, findingEmailConfirm } = submittedForm

  const dispatch = useDispatch()
  const router = useRouter()

  const submitFormHandler = (e) => {
    setSubmittedForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    
    // error 1 : submitted email is not valid
    if(findingEmail === '' || findingEmailConfirm === '') {
      return 
    }

    dispatch(setIsLoadingTrue())

    const response = await FindPasswordService(submittedForm)
    
    // submitted email and confirm email are not same
    if (!response) {
      dispatch(setIsLoadingFalse())
      return setSubmittedForm({findingEmail: '', findingEmailConfirm: ''})
    }

    dispatch(setIsLoadingFalse())

    return setEmailSent(true)
    // return router.push(`/resetPassword/${response.user._id}/${response.token}`)
  }

  const loginButtonHandler = (e) => {
    return router.push('/login')
  }

  return (
    <section className="flex justify-center items-center h-full w-full px-4 pt-12 bg-yellow-200">
      {emailSent ? 
        <div className="relative rounded-md shadow bg-zinc-800 w-full max-w-sm lg:max-w-md text-white ring-4 ring-sky-400">
          <div className="flex flex-col items-center p-7 gap-8">
            <h3 className="text-xl font-semibold">
              Email has sent
            </h3>
            <div className='rounded-full bg-green-500 aspect-square w-20 flex justify-center items-center'>
              <MdCheck className='w-12 h-12'/>
            </div>
            <div>
              <p>Please check your email to reset password.</p>
            </div>
            <button className={blueButtonLight} onClick={loginButtonHandler}>Go to Login</button>
          </div>
        </div>
        :
        <div className="relative rounded-md shadow bg-zinc-800 w-full max-w-sm lg:max-w-md text-white ring-4 ring-sky-400">
          <div className="flex flex-col items-center p-7">
            <h3 className="text-xl font-semibold">
              Enter registered email address
            </h3>
          </div>

          {/* body */}
          <form className="flex flex-col gap-4 p-5 pb-7" onSubmit={(e) => submitHandler(e)}>
            <div className='flex flex-col gap-0.5'>
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
            <div className='flex flex-col gap-0.5'>
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
            <button type='submit' className='w-full bg-sky-400 text-white p-2 rounded-md hover:bg-sky-700 my-1'>Submit</button>
          </form>
        </div>

      }

    </section>
  )
}

export default ForgotPassword