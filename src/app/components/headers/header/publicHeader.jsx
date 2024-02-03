'use client'

import Header_SearchBox from "./headerParts/header_search";
import Link from "next/link";
import { MdMoreVert, MdFavoriteBorder, MdFilterNone, MdLanguage } from 'react-icons/md'

import { useState } from 'react'

const notLoggedInLinks = [
  {
    name: 'Tutorial',
    href: '/tutorial'
  },
  {
    name: 'Login',
    href: '/login',
  },
  {
    name: 'Register',
    href: '/register',
  },
]

const subMenuLinks = [
  {
    name: 'Events',
    href: '/events'
  },
  {

    name: 'Browse',
    href:  '/browse'
  }
]

const roleBasedLinksTemplate = [
  {
    name: 'Client Memeber',
    href: '/ClientMember'
  },
  {
    name: 'Public',
    href: '/Public'
  },
  {
    name: 'Member',
    href: '/Member'
  },
]

const smallButtonStyles = "flex justify-center items-center p-2 rounded-md hover:bg-slate-700"
const iconStyles = 'w-5 h-5 text-slate-400 '

const PublicHeader = () => {

  const [ searchedText, setSearchedText ] = useState('')
  const [ isSubLinkMenuOpen, setIsSubLinkMenuOpen ] = useState(false)

  const subMenubuttonHandler = (e) => {
    setIsSubLinkMenuOpen(!isSubLinkMenuOpen)
  }

  const subLinkButtonHandler = (e, link) => {
    console.log(link, 'link button clicked')
    setIsSubLinkMenuOpen(!isSubLinkMenuOpen)
  }


  return (
    <nav className="bg-slate-900 grid grid-cols-4 p-4 absolute top-0 w-full">
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
      <div className="flex justify-end w-full items-center gap-2">
        {notLoggedInLinks && notLoggedInLinks.map((link) => {
          return <Link key={link.name} href={link.href} className="text-slate-400 hover:text-sky-500 mr-2">{link.name}</Link>
        })}
        <button className={smallButtonStyles}><MdLanguage className={iconStyles} /></button>
      </div>

      {/* Temporary */}
      <div>
        {roleBasedLinksTemplate && roleBasedLinksTemplate.map((link) => {
          return <Link key={link.name} href={link.href}>{link.name}</Link>
        })}
      </div>
    </nav>
  );
}
export default PublicHeader;