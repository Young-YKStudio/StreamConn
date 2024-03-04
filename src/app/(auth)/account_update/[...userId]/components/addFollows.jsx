'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark } from '@/app/components/buttons/buttonStyles';
import axios from 'axios';

const AddFollows = () => {
  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-20"
    >
      <div className='w-1/3 flex flex-col justify-center items-center gap-6'>
        <div className='flex flex-col items-center gap-6'>
          <p className="text-3xl">Add your favorite streamers</p>
        </div>
        <div className='mt-2 flex flex-col items-center w-full gap-4'>
          <input 
            type='text'
            name='nickname'
            className='block w-full rounded-md border-0 py-1.5 ring-inset ring-sky-500 focus:ring-sky-500 text-gray-900'
            onChange={(e) => setInputtedText(e.target.value)}
            placeholder='Nickname'
          />
        </div>
        <button
          className={bluebuttonDark + ' mt-2'}
        >
          Next
        </button>
      </div>
    </motion.section>  
  );
}
export default AddFollows;