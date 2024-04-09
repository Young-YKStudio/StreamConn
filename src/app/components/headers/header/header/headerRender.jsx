'use client'

import Header_SearchBox from "../headerParts/header_search";
import Link from "next/link";
import { MdMoreVert, MdFavoriteBorder, MdFilterNone, MdLanguage } from 'react-icons/md'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setNewReduxAuth } from "@/redux/service/authService";
import { setAuthUserReset, setAuthUserRedux, setAllStreamersUpdate, setInitialAllStreamersUpdate } from "@/redux/slice";

import { notLoggedInLinks, loggedInLinks, subMenuLinks, roleBasedLinksTemplate } from "@/app/data/headerLinks";

const smallButtonStyles = "flex justify-center items-center p-2 rounded-md hover:bg-slate-700"
const iconStyles = 'w-5 h-5 text-slate-400 '

const HeaderRender = ({allStreamers}) => {

  const [ searchedText, setSearchedText ] = useState('')
  const [ isSubLinkMenuOpen, setIsSubLinkMenuOpen ] = useState(false)

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

  const subMenubuttonHandler = (e) => {
    setIsSubLinkMenuOpen(!isSubLinkMenuOpen)
  }

  const subLinkButtonHandler = (e, link) => {
    console.log(link, 'link button clicked')
    setIsSubLinkMenuOpen(!isSubLinkMenuOpen)
  }

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

        {/* Auth enabled only */}
        <button className={smallButtonStyles}><MdFavoriteBorder className={iconStyles} /></button> 

        {/* Public */}
        <button className={smallButtonStyles}><MdFilterNone className={iconStyles} /></button>
        <button className={smallButtonStyles} onClick={subMenubuttonHandler}><MdMoreVert className={iconStyles} /></button>
      </div>

      {/* Sub hidden menu */}
      {isSubLinkMenuOpen && <div className="w-24 h-24 bg-white/40 absolute top-12 left-56 rounded-md flex flex-col">
          <div className="relative flex flex-end">
            <p>close</p>
          </div>
          {subMenuLinks && subMenuLinks.map((link, i) => {
            return <div key={'sublink'+i}>
              <Link href={link.href} onClick={(e) => setIsSubLinkMenuOpen(false)}>{link.name}</Link>
            </div>
          })}
        </div>
      }
      {/* search section */}
      <Header_SearchBox searchedText={searchedText} setSearchedText={setSearchedText} />

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