'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

const AccountIndividualPage = ({params}) => {

  const [ currentSection, setCurrentSection ] = useState()
  const session = useSession()

  return (
    <div className='flex flex-col w-full'>
      <div className='min-h-24 bg-blue-700/30 pt-16 px-8 pb-1'>
        <p className='py-1 text-normal'>General</p>
      </div>
    </div>
  );
}

export default AccountIndividualPage;