import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';

const NotSupported = () => {
  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-12"
    >
      <div className='text-center'>
        <p className="text-3xl">Other platforms are not supported yet</p>
        <p className='text-xs pt-2 leading-8 tracking-wide'>We're currently working on other platforms. Please contact us for suggesting other platforms.</p>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <button className={bluebuttonDark}>Proceed</button>
      </div>
    </motion.section>
  );
}
export default NotSupported;