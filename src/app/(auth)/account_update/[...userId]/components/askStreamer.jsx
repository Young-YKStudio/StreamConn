import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import axios from 'axios'

const AskStreamer = ({user, setCurrentPage}) => {

  const yesButtonHandler = async (e) => {
    let sendingData = {
      id: user._id,
    }
    try {
      const response = await axios.post('/api/auth/isStreamerUpdate', sendingData)
      if(response) {
        setCurrentPage('streamingPlatforms')
      }
    } catch (e) {
      console.log(e, 'error at front')
    }
  }

  const noButtonHandler = async (e) => {
    setCurrentPage('createNickname')
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
        <button onClick={yesButtonHandler} className={bluebuttonDark}>YES</button>
        <button onClick={noButtonHandler} className={bluebuttonDark}>NO</button>
      </div>
    </motion.section>
  );
}
export default AskStreamer;