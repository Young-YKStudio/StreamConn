'use client'

import { useState } from "react"

export default function SocketHome() {
  const [ inputText, setInputText ] = useState('')

  

  const sendSocket = (text) => {
    console.log('Text:', text)
  }

  return (
      <div className="pt-24">Socket test Home
        <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} 
          className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'
        /> 
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => sendSocket(inputText)}>Send</button>
      </div>
  )
}
