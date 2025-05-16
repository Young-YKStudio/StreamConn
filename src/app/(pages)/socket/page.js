'use client'
import { useSocket } from '@/app/util/SocketProvider'
import { useState } from "react"

export default function SocketHome() {
  const { socket } = useSocket()
  const [ inputText, setInputText ] = useState('')
  const [ receivedChat, setReceivedChat ] = useState([])

  const sendSocket = (text) => {
    console.log('sent to server:', text)
    socket.emit('hello', text);
    socket.on('hello', (returns)=> setReceivedChat(returns))
    console.log('receiving from server:', receivedChat)
  }

  return (
    <div className="pl-24 pt-24">Socket test Home
      <input type='text' value={inputText} onChange={(e) => setInputText(e.target.value)} 
        className='w-full bg-transparent focus:ring-0 focus:outline-none text-xs'
      /> 
      <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => sendSocket(inputText)}>Send</button>
    </div>
  )
}
