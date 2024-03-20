import { Dialog, Transition } from '@headlessui/react'
import { MdClose, MdOutlineCircle, MdOutlineCheckCircle, MdCoPresent, MdOutlineGroup, MdPeopleAlt } from 'react-icons/md'
import { FaHashtag } from "react-icons/fa6";
import { Fragment, useState } from 'react'
import axios from 'axios'

const AddChannelModal = ({isModalOpen, setIsModalOpen, user}) => {

  const [ submitForm, setSubmitForm ] = useState({
    input: '',
    isPrivate: false,
    user: undefined,
    type: 'Text',
  })
  const [ currentType, setCurrentType ] = useState('Text')

  const channelTypes = [
    { type: 'Text' },
    { type: 'Collaboration' },
    { type: 'Viewer Participation' },
  ]

  const channelTypeDistributor = (type) => {
    if (type === 'Text') {
      return <>
        <FaHashtag />
        <div className='text-sm'>
          <p className='font-bold'>Text Channel</p>
          <p className='text-slate-300 text-xs'>Send messages, images, GIFs, share opinions</p>
        </div>
      </>
    }
  }

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setIsModalOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity block'></div>
        </Transition.Child>

        <div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
          <div className='flex bg-black/20 min-h-full items-center justify-center md:px-2 lg:px-4'>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-0  md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-0 md:scale-95'
            >
              <Dialog.Panel
                className='flex w-full transform transition max-w-sm text-base'
              >
                <div className='relative w-full overflow-hidden bg-slate-700 shadow-2xl p-6 rounded-lg'>
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setIsModalOpen(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div>
                      <p className='font-bold text-lg'>Create Channel</p>
                    </div>

                    {/* channel types */}
                    <div>
                      <p className='text-xs font-bold'>Channel type</p>
                      {channelTypes.map((channel) =>(
                        <div
                          key={channel.type + 'modalChannel'}
                          className='flex flex-row items-center gap-2'
                        >

                        </div>
                      ))}
                      <div className='flex flex-row items-center gap-2'>
                        <FaHashtag />
                        <div className='text-sm'>
                          <p className='font-bold'>Text Channel</p>
                          <p className='text-slate-300 text-xs'>Send messages, images, GIFs, share opinions</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default AddChannelModal;