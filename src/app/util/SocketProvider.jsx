'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext({ socket: null, isConnected: false })

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({children}) =>{
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(null)

  const URL = process.env.SOCKET_URL

  useEffect(() => {
    const socket = io(`${URL}`, {transports: ['websocket', 'polling']})

    socket.on('connect', () => {
      console.log('socket connected')
      setIsConnected(true)
    })

    socket.on('error', (err) => {
      console.error(err)
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected')
      setIsConnected(false)
    })

    setSocket(socket)

    return () => {
      if(socket) {
        socket.disconnect()
      }
    }
  },[])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}