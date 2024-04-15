import { Dialog, Transition, Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment, useState } from 'react';
import { MdClose } from 'react-icons/md'

const AddCollarbModal = ({isEventAddModal, setIsEventAddModal}) => {

  const [ submitEventData, setSubmitEventData ] = useState({
    eventName: '',
    eventPlatforms: [], // games, web address, etc
    streamingPlatforms: [], // twitch, youtube, etc
    eventTags: [],
    eventDate: '',
    eventDescription: '',
    collarboratedUsers: [],
    eventImage: '',
    eventMaxNum: 1
  })

  const { eventName, eventPlatforms, streamingPlatforms, eventTags, eventDate, eventDescription, collarboratedUsers, eventImage, eventMaxNum } = submitEventData

  const eventNameChangeHandler = (e) => {
    setSubmitEventData((prev) => ({
      ...prev,
      eventName: e.target.value
    }))
  }

  return (
    <Transition.Root show={isEventAddModal} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setIsEventAddModal}>
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
          <div className='flex bg-black/20 min-h-full items-center justify-center md:px-2 lg:px-4'>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
            >
              <Dialog.Panel className='flex w-full transform transition max-w-sm text-base'>
                <motion.div
                  className='relative w-full overflow-hidden bg-slate-700 shadow-2xl px-4 py-6 rounded-lg'
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.45}}
                >
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setIsEventAddModal(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div>
                      <p className='font-bold text-lg'>Create Collarboration Event</p>
                    </div>

                    {/* eventName */}
                    <div className='flex flex-col gap-1'>
                      <div>
                        <p className='text-xs'>Collarboration Name</p>
                      </div>
                      <input type='text' value={eventName} onChange={(e) => eventNameChangeHandler(e)} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0'/>
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
export default AddCollarbModal;