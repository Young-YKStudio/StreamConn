import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion'

const DeleteChannelWarning = ({selectedDeleteChannel, isDeleteModal, setIsDeleteModal}) => {


  console.log(selectedDeleteChannel, 'at modal')

  return (
    <Transition.Root show={isDeleteModal} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={setIsDeleteModal}>
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
          className='fixed inset-0 w-screen overflow-y-auto'
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
                  className='relative w-full overflow-hidden bg-white shadow-2xl py-6 rounded-lg'
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.45}}
                >
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setIsDeleteModal(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div className='px-4'>
                      <p className='font-bold text-lg text-sky-400'>Delete Channel Warning</p>
                    </div>

                    {/* text */}
                    <div>
                      <p>Do you want to delete this channel?</p>
                      <p>You can't undo once deleted.</p>
                    </div>

                    {/* buttons */}
                    <div className='w-full flex justify-between'>
                      <button>Cancel</button>
                      <button>Delete</button>
                    </div>

                    <div className='scrollbar-track-sky-950 scrollbar-thumb-white/40'>
                      <div className='overflow-auto scrollbar-thin max-h-96 flex flex-col gap-4 px-4'>

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
  )
}

export default DeleteChannelWarning