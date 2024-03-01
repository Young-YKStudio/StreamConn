'use client'

import Header_SearchBox from "./headerParts/header_search";
import Link from "next/link";
import { MdMoreVert, MdFavoriteBorder, MdFilterNone, MdLanguage } from 'react-icons/md'

import { useState, useEffect } from 'react'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { notLoggedInLinks, loggedInLinks, subMenuLinks, roleBasedLinksTemplate } from "@/app/data/headerLinks";

const smallButtonStyles = "flex justify-center items-center p-2 rounded-md hover:bg-slate-700"
const iconStyles = 'w-5 h-5 text-slate-400 '

const HeaderLanding = () => {

  const [ searchedText, setSearchedText ] = useState('')
  const [ isSubLinkMenuOpen, setIsSubLinkMenuOpen ] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if(session) {
      if(!session.user.isUpdated) {
        router.push(`/account_update/${session.user.id}`)
        console.log(session, 'not updated at headerLanding')
      }
    }
  }, [session])

  const subMenubuttonHandler = (e) => {
    setIsSubLinkMenuOpen(!isSubLinkMenuOpen)
  }

  const subLinkButtonHandler = (e, link) => {
    console.log(link, 'link button clicked')
    setIsSubLinkMenuOpen(!isSubLinkMenuOpen)
  }

  const signOutProcess = async () => {
    await signOut()
    router.push('/')
  }

  const accountButtonHandler = (e, email) => {
    console.log(email)
  }

  return (
    <nav className="bg-slate-900 grid grid-cols-3 p-4 absolute top-0 w-full z-10">
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
          <button className={smallButtonStyles}><MdLanguage className={iconStyles} /></button>
        </div>
      }
    </nav>
  );
}
export default HeaderLanding;