import { Dialog, Transition, Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment, useState } from 'react';
import { MdClose, MdLock } from 'react-icons/md'

const FinishCollaboModal = ({event, finishSetupModal, setFinishSetupModal}) => {

  // Platforms
  // streamingPlatforms
  // tags
  // eventEntryDue
  // eventImage
  // collarboratedUsers
  // eventMaxNum
  // eventStatus

  return (
    <Transition.Root show={finishSetupModal} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setFinishSetupModal}>
        <Transition.Child
          as={Fragment}
        >
          <motion.div 
            className='fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity block'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          ></motion.div>
        </Transition.Child>

        <div 
          className='fixed inset-0 z-20 w-screen overflow-y-auto'
        >
          <div className='flex bg-black/20 min-h-full items-center justify-center'>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
            >
              <Dialog.Panel className='flex w-full transform transition max-w-sm text-base'>
                <motion.div
                  className='relative w-full overflow-hidden bg-slate-700 shadow-2xl py-6 rounded-lg'
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.45}}
                >
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setFinishSetupModal(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div className='px-4'>
                      <p className='font-bold text-lg'>Create Collarboration Event</p>
                    </div>

                    <div className='scrollbar-track-sky-950 scrollbar-thumb-white/40'>
                      <div className='overflow-auto scrollbar-thin max-h-96 flex flex-col gap-4 px-4'>
                        {/* eventName */}


                        {/* submit button */}
                        <button className='w-full bg-sky-800 py-2 rounded-lg hover:bg-sky-900'>Create Event</button>

                      </div>
                    </div>

                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default FinishCollaboModal;