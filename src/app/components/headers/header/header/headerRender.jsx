'use client'

import Header_SearchBox from "../headerParts/header_search";
import SubLinks from "../headerParts/subLInks";
import Link from "next/link";
import AuthButton from "../headerParts/authButton";

import { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setNewReduxAuth } from "@/redux/service/authService";
import { setAuthUserRedux, setAllStreamersUpdate, setInitialAllStreamersUpdate } from "@/redux/slice";

const HeaderRender = ({allStreamers}) => {

  const { data: session, status } = useSession()
  const router = useRouter()
  const path = usePathname()
  const dispatch = useDispatch()
  let authStatus = useSelector((state) => state.redux.isAuthStored)
  let allStreamersRedux = useSelector((state) => state.redux.allStreamers)
  let authUpdate = useSelector((state) => state.redux.forceAuthUpdate)

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

      if(!session.user.isUpdated) {
        if(path.startsWith('/account_update')) {
          return
        }
        return router.push(`/account_update/welcome/`)
      }
    }

  }, [session, authStatus, path, authUpdate])

  return (
    <nav className="bg-black/40 grid grid-cols-3 p-4 absolute top-0 w-full z-10">
      {/* Logo/left section */}
      <div className="flex flex-row gap-2 items-center">
        <Link href='/' className="truncate text-sky-500">Stream Connect</Link>
        <SubLinks />
      </div>

      {/* search section */}
      <Header_SearchBox />

      {/* link elements section */}
      <AuthButton status={status} session={session} />
    </nav>
  );
}
export default HeaderRender;