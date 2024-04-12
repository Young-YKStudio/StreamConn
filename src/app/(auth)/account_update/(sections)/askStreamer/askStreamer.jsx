'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import { updateAskStreamer } from '@/redux/service/authWelcomeService'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'; 

const AskStreamerRender = () => {

  const router = useRouter()
  const loggedUser = useSelector((state) => state.redux.auth)
  const dispatch = useDispatch()

  const buttonHandlers = async (e, boolean) => {

    let sendingData

    if(boolean) {
      sendingData = {
        id: loggedUser._id,
        isStreamer: true
      }
    } else {
      sendingData = {
        id: loggedUser._id,
        isStreamer: false
      }
    }
    

    dispatch(setIsLoadingTrue())

    let request = await updateAskStreamer(sendingData)

    if(request) {
      if(loggedUser.nickname) {
        dispatch(setIsLoadingFalse())
        return router.push('/account_update/addFollows')
      }
      dispatch(setIsLoadingFalse())
      return router.push('/account_update/username')
    }

    dispatch(setIsLoadingFalse())
    return 
  }

  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-12"
    >
      <div>
        <p className="text-3xl">Are you a streamer?</p>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <button onClick={(e) => buttonHandlers(e, true)} className={bluebuttonDark}>YES</button>
        <button onClick={(e) => buttonHandlers(e, false)} className={bluebuttonDark}>NO</button>
      </div>
    </motion.section>
  );
}
export default AskStreamerRender;