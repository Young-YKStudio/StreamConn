'use client'

import { useRouter } from 'next/navigation'

const TokenExpiredPage = ({user}) => {

  const router = useRouter()

  const buttonHandler = (e) => {
    return router.push('/forgot-password')
  }

  return (
    <div className="relative rounded-md shadow bg-zinc-800 w-full max-w-sm lg:max-w-md text-white ring-4 ring-sky-400">
      <div className="flex flex-col items-center p-7">
        <h3 className="text-xl font-semibold">
          Password reset request expired
        </h3>
      </div>

      <div className='flex flex-col gap-4 p-5 pb-7'>
        <div className="text-pretty">
          <p>looks like your password reset request has been expired. Please request again.</p>
        </div>
        <button onClick={buttonHandler} className='w-full bg-sky-400 text-white p-2 rounded-md hover:bg-sky-700 my-1'>Password Reset</button>
      </div>

    </div>
  )
}

export default TokenExpiredPage