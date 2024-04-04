import { Dialog, Transition, Switch } from '@headlessui/react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { channelTypeDistributor, channelTypes, channelNameValidator } from '../(parts)/(sharedFunctions)/channelSharedFunctions';
import { MdClose, MdLock } from 'react-icons/md'
import { addChannelRequest } from '@/redux/service/modalService';
import { useDispatch } from 'react-redux';
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice';

// 투표
// 토토
// 미션 socket 필수
// 도네
// 돌림판

const AddChannelModal = ({isModalOpen, setIsModalOpen, channelUser, currentUser}) => {

  const [ channelSubmitForm, setChannelSubmitForm ] = useState(
    {
      channelName: '',
      channelOwner: channelUser._id,
      author: currentUser._id,
      isPrivate: false,
      channelType: 'Text'
    }
  )
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ apiLoading, setApiLoading ] = useState(false)

  const { channelName, isPrivate, channelType } = channelSubmitForm
  const dispatch = useDispatch()

  const channelTypeButtonHandler = (e, type) => {
    if(type === channelType) {
      return
    }

    setChannelSubmitForm((prev) => ({
      ...prev,
      channelType: type
    }))
  }

  const channelNameChangeHandler = (e) => {
    setChannelSubmitForm((prev) => ({
      ...prev,
      channelName: e.target.value
    }))
  }

  const channelIsPrivateChangeHandler = (e, state) => {
    setChannelSubmitForm((prev) => ({
    ...prev,
      isPrivate: !state
    }))
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const submitHandler = async (e) => {

    dispatch(setIsLoadingTrue())

    let error = await channelNameValidator(channelName)

    if(error) {
      return dispatch(setIsLoadingFalse())
    }

    const request = await addChannelRequest(channelSubmitForm)

    if(request) {
      dispatch(setIsLoadingFalse())
      setIsModalOpen(false)
      return window.location.reload()
    }

    dispatch(setIsLoadingFalse())
    return 
  }

  const loadingButtons = (loading) => {
    if(loading) {
      return <button className='bg-sky-700/80 py-2 rounded-md flex items-center flex-row justify-center hover:cursor-progress'>
        <AiOutlineLoading3Quarters className='w-4 h-4 animate-spin' /> Loading...
      </button>
    } else {
      return <button className='bg-sky-700 py-2 rounded-md hover:bg-sky-500' onClick={submitHandler}>
        Create Channel
      </button>
    }
  }

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setIsModalOpen}>
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
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setIsModalOpen(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div>
                      <p className='font-bold text-lg'>Create Channel</p>
                    </div>

                    {/* channel types */}
                    <div className='flex flex-col gap-1'>
                      <p className='text-xs font-bold pb-1'>Channel Type</p>
                      {channelTypes.map((channel) =>(
                        <div
                        key={channel.type + 'modalChannel'}
                        onClick={(e) => channelTypeButtonHandler(e, channel.type)}
                        >
                          {channelTypeDistributor(channel.type, channelType)}
                        </div>
                      ))}
                    </div>

                    {/* channel name */}
                    <div className='flex flex-col gap-1'>
                      <div className='pb-1'>
                        <p className='text-xs font-bold'>Channel Name</p>
                        <p className='text-slate-300 text-xs'>Special charactors and spaces are not allowed, 2-16 letters</p>
                      </div>
                      <input 
                        type='text' 
                        value={channelName} 
                        onChange={channelNameChangeHandler} 
                        placeholder='Enter channel name'
                        className={`bg-black/30 ring-0 border-none rounded-md focus:ring-0 text-sm px-4 py-2 ${errorMessage !== '' && 'ring-2 ring-red-500'}`}
                      />
                    </div>

                    {/* private option */}
                    <div className='flex flex-row justify-between items-center gap-1'>
                      <div className='flex flex-row gap-2 items-center'>
                        <MdLock className='w-5 h-5'/>
                        <div>
                          <p className='text-xs font-bold'>Private Channel</p>
                          <p className='text-slate-300 text-xs'>Only allowed ones will be able to view channel</p>
                        </div>
                      </div>
                      <Switch
                        checked={isPrivate}
                        onChange={(e) => channelIsPrivateChangeHandler(e, isPrivate)}
                        className={classNames(
                          isPrivate ? 'bg-sky-500' : 'bg-gray-200',
                          'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0'
                        )}
                      >
                        <span
                          className={classNames(
                            isPrivate ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        >
                          <span
                            className={classNames(
                              isPrivate ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </Switch>
                    </div>

                    {/* buttons */}
                    <div className='flex flex-col gap-2 pt-2 text-sm'>
                      {channelName !== '' ? 
                        loadingButtons(apiLoading)
                        :
                        <button className='bg-sky-700/40 py-2 rounded-md text-slate-300 cursor-not-allowed'>Create Channel</button>
                      }
                      <button className='py-2 hover:text-red-600'>Cancel</button>
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
export default AddChannelModal;

// TODO: error handling for backends