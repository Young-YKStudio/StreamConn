import { MdMenu, MdClose } from "react-icons/md";
import { useState } from 'react'
import { PopUp } from "./popup/PopUp";

export const SocketHorizontalHeader = () => {

  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)

  const leftMenuToggleHandler = (e) => {
    setIsLeftMenuOpen(!isLeftMenuOpen)
  }

  const leftMenuStyle = (state) => {
    if(state) {
      return "translateX(0)"
    } else {
      return "translateX(-200px)"
    }
  }

  return (
    <div className="relative w-screen bg-zinc-800 text-white ring-4 ring-sky-400 z-50">
      <div className="h-12 flex flex-row justify-between items-center px-4">
        {/* left side */}
        <div className="flex flex-row gap-2">
          {/* hamburger menu */}
          <button onClick={leftMenuToggleHandler}>
            {isLeftMenuOpen ?
              <MdClose className="w-6 h-6 hover:text-sky-400 " />
              :
              <MdMenu className="w-6 h-6 hover:text-sky-400 " />
            }
          </button>
          {/* logo image */}
          <p>logo image</p>
        </div>

        {/* right side */}
        <div className="flex flex-row gap-2">
          {/* account menu */}
          <p>account menu</p>

        </div>
      </div>
      {/* popup */}
      {isLeftMenuOpen &&
        <PopUp />
      }
    </div>
  )
}