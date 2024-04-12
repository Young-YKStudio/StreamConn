'use client'

import { motion } from 'framer-motion'
import { bluebuttonDark, blueButtonDarkOutlined } from '@/app/components/buttons/buttonStyles'
import { useState } from 'react'

const AskPlatform = ({setCurrentPage}) => {

  const [platforms, setPlatforms] = useState([
    {
      name: 'Twitch',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'YouTube',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'Chzzk',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'Afreeca',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
    {
      name: 'KICK',
      checked: false,
      image: '',
      href: '',
      hrefChecked: false,
    },
  ])

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

    console.log(platforms, 'button clicked')
    // let tempArry = []
    // platforms.forEach(platform => {
    //   if(platform.checked) {
    //     tempArry.push(platform.name)
    //   }
    // })
    // if(tempArry.length === 0) {
    //   console.log('no platform selected')
    //   return
    // }
    // setCurrentPage('askPlatformAddress')
  }
  
  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      viewport={{once: true}}
      transition={{ease: "linear", duration: 0.75}} 
      className="flex flex-col justify-center items-center w-full h-full gap-8"
    >
      <div>
        <p className="text-3xl">Select platforms you stream</p>
      </div>
      <div className='w-full'>
        <fieldset className='w-full flex flex-row justify-center'>
          <form className='w-full max-w-xs' onSubmit={(e) => nextBtnHandler(e, 'submitBtn')}>
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
        </fieldset>
      </div>
    </motion.section>
  );

}
export default AskPlatform;