'use client'

import Header_SearchBox from "../headerParts/header_search";
import SubLinks from "../headerParts/subLInks";
import Link from "next/link";
import { MdMoreVert, MdFavoriteBorder, MdFilterNone, MdLanguage } from 'react-icons/md'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setNewReduxAuth } from "@/redux/service/authService";
import { setAuthUserReset, setAuthUserRedux, setAllStreamersUpdate, setInitialAllStreamersUpdate } from "@/redux/slice";

import { notLoggedInLinks, loggedInLinks, subMenuLinks, roleBasedLinksTemplate } from "@/app/data/headerLinks";

const HeaderRender = ({allStreamers}) => {

  const [ isAccountButtonClicked, setIsAccountButtonClicked ] = useState(false)

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

  const signOutProcess = async () => {
    let loggginOut = await logOut()
    if(loggginOut) {
      dispatch(setAuthUserReset())
    }
  }

  const accountButtonHandler = (e, email) => {
    console.log(email)
  }

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
      {session ? <div className="flex justify-end w-full items-center gap-2 text-slate-400">
          {/* my account */}
          <button onClick={(e) => accountButtonHandler(e, session.user.email)} className=" hover:text-sky-500">My Account</button>
          {/* logout */}
          <button onClick={() => signOutProcess()} className=" hover:text-sky-500">Logout</button>
        </div> 
        :
        <div className="flex justify-end w-full items-center gap-2">
          {notLoggedInLinks && notLoggedInLinks.map((link) => {
            return <Link key={link.name} href={link.href} className="text-slate-400 hover:text-sky-500 mr-2">{link.name}</Link>
          })}
          {/* <button className={smallButtonStyles}><MdLanguage className={iconStyles} /></button> */}
        </div>
      }
    </nav>
  );
}
export default HeaderRender;