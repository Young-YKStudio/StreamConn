'use client'
import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import { useRouter } from 'next/navigation'

const Introduction = ({user, setCurrentPage}) => {

  const router = useRouter()

  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-20"
    >
      <div className='flex flex-col items-center gap-4'>
        <p className="text-3xl">Welcome to Stream Connect!</p>
        <p>Please tell us about you</p>
      </div>
      <button
        className={bluebuttonDark}
        onClick={(e) => router.push('/account_update/askStreamer')}
      >
        Let's get started!
      </button>
    </motion.section>
  );
}
export default Introduction;