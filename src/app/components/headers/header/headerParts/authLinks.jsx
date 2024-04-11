import { useState, useEffect } from 'react'
import { MdPerson } from "react-icons/md";
import { useSelector } from 'react-redux'
import AuthLinksPopUp from './authLinksPopUp';
import { usePathname } from 'next/navigation';

const AuthLinks = ({session}) => {

  const [ isAuthButton, setIsAuthButton ] = useState(false)
  const [ isAuthButtonHovered, setIsAuthButtonHovered ] = useState(false)

  const path = usePathname()
  const loggedUser = useSelector(state => state.redux.auth)

  const accountButtonHandler = (e) => {
    setIsAuthButton(!isAuthButton) 
  }

  const displayingUserName = (buttonClicked, hovered, nickname) => {
    if(buttonClicked) {
      return nickname
    }
    if(hovered) {
      return nickname
    }
    return null
  }

  const buttonStyleDistributor = (buttonClicked, hovered) => {
    if(buttonClicked || hovered) {
      return 'px-2 py-1 rounded-md bg-sky-800 flex flexrow flex-nowrap gap-2 text-xs items-center'
    }
    return 'px-2 py-1 rounded-md hover:bg-sky-800 flex flex-row flex-nowrap gap-2 text-xs items-center'
  }

  useEffect(() => {
    return setIsAuthButton(false)
  },[path])

  if(loggedUser) {
    return (
      <div className='flex items-center relative'>
        <button
          onClick={accountButtonHandler}
          onMouseEnter={(e) => setIsAuthButtonHovered(true)}
          onMouseLeave={(e) => setIsAuthButtonHovered(false)}
          className={buttonStyleDistributor(isAuthButton, isAuthButtonHovered)}
          >
          {displayingUserName(isAuthButton, isAuthButtonHovered, loggedUser.nickname)}
          {loggedUser.profile ? 
            <img src={loggedUser.profile} alt={loggedUser.nickname + ' profile'} className="w-6 h-6 rounded-full" />
          :
            <div
              className='p-1 rounded-full bg-sky-950'
            >
              <MdPerson className='w-5 h-5'/>
            </div>
          }
        </button>
        {isAuthButton && <AuthLinksPopUp />}
      </div>
    );
  }
}
export default AuthLinks;