'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark, blueButtonDarkOutlined } from '@/app/components/buttons/buttonStyles'

const AddStreamerAddress = ({platforms, setPlatforms, setCurrentPage}) => {

  const checkBoxStyles = 'h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500'

  const changeHandler = (e) => {
    let platformName = e.target.name
    setPlatforms(platforms.map(platform => {
      if(platform.name === platformName) {
        return {...platform, checked: !platform.checked}
      } else {
        return platform
      }
    }))
  }

  const nextBtnHandler = (e, type) => {
    e.preventDefault()
    console.log(platforms, type, 'button clicked')
  }

  const nonBtnHandler = (e, type) => {
    setCurrentPage('notSupported')
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
        <p className="text-3xl">Provide your streaming address</p>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <fieldset>
          <form className='w-48' onSubmit={(e) => nextBtnHandler(e, 'submitBtn')}>
            <legend className='text-base font-semibold leading-6'>Platforms</legend>
            <div className='mt-4 divide-y divide-white/45 border-b border-t border-white/45'>
              {platforms.map((platform, i) => (
                <div
                  key={platform.name + i}
                  className='relative flex items-start py-4 px-4'
                >
                  <div className='min-w-0 flex-1 text-sm leading-6'>
                    <label htmlFor={platform.name} className='select-non font-medium'>{platform.name}</label>
                  </div>
                  <div className='ml-3 flex h-6 items-center'>
                    <input type='checkbox' checked={platform.checked} name={platform.name} className={checkBoxStyles} onChange={changeHandler}/>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full flex justify-center my-4'>
              <button className={`${bluebuttonDark} w-full`} type='submit'>Next</button>
            </div>
          </form>
          <button className={`${blueButtonDarkOutlined} w-full`} onClick={(e) => nonBtnHandler(e, 'nonBtn')}>Non of the above</button>
        </fieldset>
      </div>
    </motion.section>
  );
}
export default AddStreamerAddress;