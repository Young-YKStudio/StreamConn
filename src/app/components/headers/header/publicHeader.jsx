'use client'

import Header_SearchBox from "./headerParts/header_search";
import Link from "next/link";
import { MdMoreVert, MdFavoriteBorder, MdFilterNone, MdLanguage } from 'react-icons/md'

import { useState } from 'react'

const notLoggedInLinks = [
  {
    name: 'Login',
    href: '/login',
  },
  {
    name: 'Sign In',
    href: '/register',
  }
]

const smallButtonStyles = "flex justify-center items-center p-2 rounded-md hover:bg-slate-700"
const iconStyles = 'w-5 h-5 text-slate-400 '

const PublicHeader = () => {

  const [ searchedText, setSearchedText ] = useState('')

  return (
    <nav className="bg-slate-900 grid grid-cols-3 p-4 absolute top-0 w-full">
      {/* Logo/left section */}
      <div className="flex flex-row gap-2 items-center">
        <Link href='/' className="truncate text-sky-500">Stream Connect</Link>

        {/* Auth enabled only */}
        <button className={smallButtonStyles}><MdFavoriteBorder className={iconStyles} /></button> 
        {/* Public */}
        <button className={smallButtonStyles}><MdFilterNone className={iconStyles} /></button>
        <button className={smallButtonStyles}><MdMoreVert className={iconStyles} /></button>
      </div>

      {/* search section */}
      <Header_SearchBox searchedText={searchedText} setSearchedText={setSearchedText} />

      {/* link elements section */}
      <div className="flex justify-end w-full items-center gap-2">
        {notLoggedInLinks && notLoggedInLinks.map((link) => {
          return <Link key={link.name} href={link.href} className="text-slate-400 hover:text-sky-500 mr-2">{link.name}</Link>
        })}
        <button className={smallButtonStyles}><MdLanguage className={iconStyles} /></button>
      </div>
    </nav>
  );
}
export default PublicHeader;