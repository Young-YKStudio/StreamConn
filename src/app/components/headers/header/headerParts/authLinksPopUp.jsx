import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/service/authService'
import { setAuthUserReset, setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { MdLogout, MdSettings } from "react-icons/md";
import Link from 'next/link';

const AuthLinksPopUp = () => {

  const dispatch = useDispatch()

  const logoutprocess = async () => {
    dispatch(setIsLoadingTrue())

    let loggginOut = await logOut()
    if(loggginOut) {
      dispatch(setAuthUserReset())
    }

    return dispatch(setIsLoadingFalse())

  }

  return (
    <motion.div
      className="absolute top-[3.5em] right-[.0125em] bg-sky-800 p-2 rounded-md text-xs flex flex-col min-w-[13em]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: 0.2}}
    >
      {/* account setting */}
      <Link 
        href="/accountSetting"
        className='flex gap-1 items-center px-2 py-1.5 rounded-md hover:bg-sky-950'
      >
        <MdSettings className='w-4 h-4' />
        Account Settings
      </Link>

      {/* logoutButton */}
      <button
        className='flex gap-1 items-center px-2 py-1.5 rounded-md hover:bg-sky-950'
        onClick={(e) => logoutprocess(e)}
      >
        <MdLogout className='w-4 h-4' />
        Logout
      </button>
    </motion.div>
  );
}
export default AuthLinksPopUp;