'use client'

import { useSelector } from 'react-redux'

export default function SpinnerOverlay() {

  const { isLoading } = useSelector((state) => state.redux)

  if(isLoading) {
    return (
      <div className='spinnerContainer'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p>Loading...</p>
      </div>
    )
  }
}