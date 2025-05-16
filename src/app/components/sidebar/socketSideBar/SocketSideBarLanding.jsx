'use client'
import { SocketVerticalSideBar } from "./verticalSide/SocketVerticalSideBar"
import { SocketHorizontalHeader } from "./horizontalHeader/SocketHorizontalHeader"
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setNewReduxAuth } from '@/redux/service/authService'
import { setAuthUserRedux, setAllStreamersUpdate, setInitialAllStreamersUpdate, setNewReleasedGames } from '@/redux/slice'
import { useSocket } from '@/app/util/SocketProvider'
import { getNewGames } from '@/redux/service/IGDBServices'

export const SocketSideBarLanding = ({logged, allStreamers}) => {

  const { data: session, status } = useSession()
  const { socket } = useSocket()
  const router = useRouter()
  const path = usePathname()
  const dispatch = useDispatch()
  let authStatus = useSelector((state) => state.redux.isAuthStored)
  let allStreamersRedux = useSelector((state) => state.redux.allStreamers)
  let authUpdate = useSelector((state) => state.redux.forceAuthUpdate)

  const [ newReleases, setNewReleases ] = useState()
  const [ events, setEvents ] = useState()

  useEffect(() => {
  
    if(allStreamersRedux) {
      if(allStreamersRedux.length === 0) {
        dispatch(setInitialAllStreamersUpdate(allStreamers))
      }
      
      if(allStreamersRedux.length > 0) {
        let tempArray = Object.assign([], allStreamers)
        dispatch(setAllStreamersUpdate(tempArray))
      }
    }
    
    
    if(status === 'authenticated') {
      const setAuthUserReduxFunction = async () => {        
        let setReduxAuth = await setNewReduxAuth(session.user.id)
        dispatch(setAuthUserRedux(setReduxAuth))
      }
      
      setAuthUserReduxFunction()

      // if(!session.user.isUpdated) {
      //   if(path.startsWith('/account_update')) {
      //     return
      //   }
      //   return router.push(`/account_update/welcome/`)
      // }
    }

  }, [session, authStatus, path, authUpdate])

  useEffect(() => {
    let dummySendingData = '1234567890'
    let callAPI = setTimeout(async () => {

      let request = await getNewGames(dummySendingData)
      if(request) {
        if(request.status === 200) {
          setNewReleases(request.data.newReleases)
          dispatch(setNewReleasedGames(request.data.newReleases))
        }

        if(request.status === 408) {
          console.log('mongoError')
        }

        if(request.status === 409) {
          console.log('IGDBError')
        }
      } else {
        console.log('other error')
      }

    }, 1)
    return () => {
      clearTimeout(callAPI)
    }
  }, [])

  // TODO: to be deleted
  // useEffect(() => { 
  //   console.log(path)
  // },[socket])

  return (
    <nav className="absolute flex md:h-full md:items-center md:pl-4 ">
      <div className="md:hidden">
        <SocketHorizontalHeader allStreamers={allStreamers} path={path} newReleases={newReleases} />
      </div>
      <div className="hidden md:relative md:flex h-[95%] shadow-2xl rounded-lg w-14 bg-black text-slate-200">
        <SocketVerticalSideBar allStreamers={allStreamers} path={path} newReleases={newReleases} />
      </div>
      {/* hamburger menu */}
      {/* logo */}
      {/* search */}
      {/* favorite */}
      {/* suggested */}
      {/* suggested */}
    </nav>
  )
}