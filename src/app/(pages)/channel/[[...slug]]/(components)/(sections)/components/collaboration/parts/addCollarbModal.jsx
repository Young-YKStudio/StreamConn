import { Dialog, Transition, Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Fragment, useState, useEffect } from 'react';
import { MdClose, MdLock } from 'react-icons/md'
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'
import { isBefore } from 'date-fns';
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import CollarbSearchStreamerPopUp from './collarbSearchStreamer';
import { CreateCollarborationEvent } from '@/redux/service/collarborationService'
import { useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice';

const AddCollarbModal = ({isEventAddModal, setIsEventAddModal, loggedUser, channelOwner}) => {

  const [ submitEventData, setSubmitEventData ] = useState({
    eventName: '',
    eventDescription: '',
    invitationOnly: false
  })
  const [ eventTags, setEventTags ] = useState([])
  // const [ streamingPlatforms, setStreamingPlatforms ] = useState([])
  const [ tagInput, setTagInput ] = useState('')
  const [ eventStart, setEventStart ] = useState('')
  const [ eventEnd, setEventEnd ] = useState('')
  // const [ streamerSearch, setStreamerSearch ] = useState('')
  // const [ searchedStreamers, setSearchedStreamers ] = useState([])
  // const [ selectedStreamers, setSelectedStreamers ] = useState([])

  const { eventName, eventDescription, invitationOnly } = submitEventData

  // const allStreamers = useSelector((state) => state.redux.allStreamers)
  const dispatch = useDispatch()


  const eventNameChangeHandler = (e) => {
    setSubmitEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const tagInputChangeHandler = (e) => {
    setTagInput(e.target.value)
  }

  const tagAddButtonHandler = (e) => {
    if(tagInput === '') {
      return 
    }

    let duplicatedInput = eventTags.find((tag) => tag === tagInput)

    if(duplicatedInput) {
      return 
    }

    setEventTags((prev) => ([
      ...prev,
      tagInput
    ]))

    return setTagInput('')
  }

  const removeTagHandler = (e, tagInput) => {
    setEventTags(eventTags.filter((tag) =>  tag !== tagInput))
  }

  const datePickerChangeHandler = (e) => {
    if(e.target.name === 'eventStart') {
      return setEventStart(e.target.value)
    }
    if(e.target.name === 'eventEnd') {
      return setEventEnd(e.target.value)
    }
  }

  const changeEventTypeHandler = (e) => {
    setSubmitEventData((prev) => ({
      ...prev,
      invitationOnly: !invitationOnly
    }))
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(setIsLoadingTrue())

    let sendingData = {
      eventName: eventName,
      eventOwner: channelOwner,
      eventTags: eventTags,
      eventDateStart: eventStart,
      eventDateEnd: eventEnd,
      eventDescription: eventDescription,
      isPrivate: invitationOnly
    }

    let request = await CreateCollarborationEvent(sendingData)

    console.log(request)

    dispatch(setIsLoadingFalse())
  }



  const now = new Date()
  const currentzone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const currentTime = formatInTimeZone(now, currentzone, 'yyyy-MM-dd HH:mm:ss')
  const utcTime = fromZonedTime(currentTime) // validates utc time for upload purposes
  const convertedTime = formatInTimeZone(utcTime, 'America/Los_Angeles', 'yyyy-MM-dd HH:mm:ss')

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
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setIsEventAddModal(false)}><MdClose className='w-6 h-6'/></button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div className='px-4'>
                      <p className='font-bold text-lg'>Create Collarboration Event</p>
                    </div>

                    <div className='scrollbar-track-sky-950 scrollbar-thumb-white/40'>
                      <div className='overflow-auto scrollbar-thin max-h-96 flex flex-col gap-4 px-4'>
                        {/* eventName */}
                        <div>
                          <div className='flex flex-col gap-1'>
                            <div>
                              <p className='text-xs'>Collarboration Event Name</p>
                            </div>
                            <input type='text' name='eventName' value={eventName} onChange={(e) => eventNameChangeHandler(e)} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0' placeholder='enter event name'/>
                          </div>
                        </div>

                        {/* tags */}
                        <div className='flex flex-col gap-1'>
                          <div>
                            <p className='text-xs'>Tags <span className='italic text-slate-400'>(enter related words)</span></p>
                          </div>
                          <div className='flex flex-row flex-nowrap'>
                            <input 
                              type='text' value={tagInput} onChange={tagInputChangeHandler} className='text-slate-600 w-full text-xs rounded-l-lg focus:ring-0 ring-0' 
                              placeholder='enter tags'
                            />
                            <button onClick={tagAddButtonHandler} className='w-24 text-xs px-2 bg-sky-800 rounded-r-lg hover:bg-sky-900'>Add Tag</button>
                          </div>
                          <div>
                            {eventTags.length === 0 ?
                              <p className='text-xs text-center'>No tags added</p>
                            :
                              <div className='text-xs flex flex-row gap-2 flex-wrap'>
                                {eventTags.map((tag) => (
                                  <div 
                                    key={tag + 'tagKey'}
                                    className='flex flex-row flex-nowrap px-2 py-1 bg-sky-900 rounded-full items-center gap-1'
                                  >
                                    <p>{tag}</p>
                                    <button
                                      className='p-0.5 bg-white/10 rounded-full hover:bg-white/30'
                                      onClick={(e) => removeTagHandler(e, tag)}
                                    >
                                      <MdClose className='w-3 h-3'/>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            }
                          </div>
                        </div>

                        {/* event date and time */}
                        <div className='flex flex-col gap-2'>
                          <div className='flex flex-row flex-nowrap items-center justify-between w-full gap-2'>
                            <p className='text-xs'>Event starts : </p>
                            <input type='datetime-local' name='eventStart' value={eventStart} onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' />
                          </div>
                          <div className='flex flex-row flex-nowrap items-center justify-between w-full gap-2'>
                            <p className='text-xs'>Event ends : </p>
                            <input type='datetime-local' name='eventEnd' value={eventEnd} onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' />
                          </div>
                        </div>

                        {/* eventType */}
                        <div className='flex flex-row justify-between items-center gap-1'>
                          <div className='flex flex-row gap-2 items-center'>
                            <MdLock className='w-5 h-5' />
                            <div>
                              <p className='text-xs font-bold'>Private Event</p>
                              <p className='text-slate-300 text-xs'>Private event is opened to invitaion only</p>
                            </div>
                          </div>
                          <Switch
                            checked={invitationOnly}
                            onChange={(e) => changeEventTypeHandler(e)}
                            className={classNames(
                              invitationOnly ? 'bg-sky-500' : 'bg-gray-200',
                              'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0'
                            )}
                          >
                            <span
                              className={classNames(
                                invitationOnly ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            >
                              <span
                                className={classNames(
                                  invitationOnly ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
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

                        {/* event description */}

                        <div className='flex flex-col gap-1'>
                          <div>
                            <p className='text-xs'>Event description</p>
                          </div>
                          <textarea value={eventDescription} name='eventDescription' rows={4} onChange={(e) => eventNameChangeHandler(e)} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0' placeholder='enter event name'/>
                        </div>


                        {/* submit button */}
                        <button onClick={submitHandler} className='w-full bg-sky-800 py-2 rounded-lg hover:bg-sky-900'>Create Event</button>

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
export default AddCollarbModal;

{/* <div className="isolate flex -space-x-1 overflow-hidden">
<img
  className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  alt=""
/> 

                        <div className='flex flex-col gap-2 relative'>
                          <div>
                            <p className='text-xs'>Collarborating Streamers</p>
                          </div>
                          <input type='text' value={streamerSearch} onChange={streamerSearchChangeHandler} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0' placeholder='search streamers and send invitations'/>

                          {streamerSearch !== '' && <CollarbSearchStreamerPopUp searchedStreamers={searchedStreamers} selectedStreamers={selectedStreamers} setSelectedStreamers={setSelectedStreamers} />}

                        </div>

  // useEffect(() => {
  //   if(allStreamers) {
  //     let foundStreamers = allStreamers.filter(streamer => streamer.nickname.toLowerCase().includes(streamerSearch.toLowerCase()))
  //     if(foundStreamers.length > 0) {
  //       return setSearchedStreamers(foundStreamers)
  //     }
  //     if(foundStreamers.length === 0) {
  //       return setSearchedStreamers([])
  //     }
  //   }

  // },[streamerSearch])
*/


}