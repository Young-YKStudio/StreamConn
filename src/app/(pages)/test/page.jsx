'use client'
import { useState, useEffect } from 'react'
import { useSocket } from '@/app/util/SocketProvider'

const TestLanding = () => {

  const [inputtedText, setInputtedText] = useState('')
  const [ receivedChat, setReceivedChat ] = useState([])

  const { socket } = useSocket()

  useEffect(() => {
    
    if(socket) {

      const initialConnection = () => {
        if(receivedChat.length > 0) {
          return
        }
        
        socket.emit('testChat', 'initialConnection')
        socket.on('testChat', (returns)=> setReceivedChat(returns))
      }

      initialConnection()
      // socket.connected && socket.on('testChat', (chat) => {
      //   console.log(chat, 'chat on socket / initial load')
      // }) 
    }


  },[socket])

  const submitHandler = (e) => {
    e.preventDefault()
    socket.emit('testChat', inputtedText)
    socket.on('testChat', (returns)=> setReceivedChat(returns))
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <p>test Page landing</p>
      <div className='flex flex-row flex-nowrap'>
        {/* 채팅창 */}
        <div className='bg-yellow-200 flex flex-col'>
          {receivedChat.map((chat) => {
            return <p key={chat._id}>{chat.body}</p>
          })}
        </div>
        {/* 입력창 */}
        <form onSubmit={submitHandler}>
          <input type='text' value={inputtedText} onChange={(e) => setInputtedText(e.target.value)} />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}
export default TestLanding;