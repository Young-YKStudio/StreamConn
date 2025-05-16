'use client'
import { useDispatch, useSelector } from "react-redux";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";
import { imageUploadService } from "@/redux/service/uploadService";
import { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import { useState, useEffect } from 'react'
import { sendTestEmail } from '@/redux/service/authService'

import { Dialog, Transition, Switch } from '@headlessui/react'
import { motion } from 'framer-motion'
import { MdClose, MdLock } from 'react-icons/md'

// import AddCollarbModal from '../../components/collaboration/parts/modal/addCollarbModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns"
// import { myevents, myresources } from '../../../../../../calendar/data'
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'
import { formatISO } from 'date-fns'

const locales = { "en-US": require("date-fns") };

// Setup the localizer by providing the moment (or globalize, or Luxon) Object to the correct localizer.
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const ChannelHomePage = ({ calendarEvents, channelEvents, foundUser }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.redux.auth)

  const [ uploadQueue, SetUploadQueue ] = useState([])
  const [ updatedCal, setUpdatedCal ] = useState([])
  const [ mutatedData, setMutatedData ] = useState([])

  let initialData = [
    {id: 'fist id', name: '1', number: 1},
    {id: 'second id', name: '2', number: 2},
    {id: 'third id', name: '23', number: 3},
  ]

  const [ isEventAddModal, setIsEventAddModal ] = useState(false)

  const [ selectedCalendarEvent, setSelectedCalendarEvent ] = useState()
  // const [ selectedEventTitle, setSelectedEventTitle ] = useState()
  const [ eventStart, setEventStart ] = useState('')
  const [ eventEnd, setEventEnd ] = useState('')

  const [ submitEventData, setSubmitEventData ] = useState({
    eventName: '',
    eventDescription: '',
    invitationOnly: false
  })

  const clickRef = useRef(null)
  
  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
      // console.log(clickRef?.current)
    }
  }, [])

  const viewModal = async (calEvent) => {
    console.log('MODAL HERE:', calEvent.title)
    setSelectedCalendarEvent(calEvent)
    setEventStart(format(calEvent.start, "yyyy-MM-dd'T'HH:mm:ss"))
    setEventEnd(format(calEvent.end, "yyyy-MM-dd'T'HH:mm:ss"))
    // setSelectedEventTitle(calEvent.title)
    setIsEventAddModal(true)
  }


  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      // window.alert(buildMessage(calEvent, 'onSelectEvent'))
      console.log('onSelectEvent:', calEvent)
      viewModal(calEvent)
    }, 250)
  }, [])

  const testButtonHandler = async (e) => {
    let emailSending = await sendTestEmail()
  }

  const datePickerChangeHandler = (e) => {
    // console.log('Date:', selectedCalendarEvent.end, ', formatted: ', format(e.target.value, 'EEE MMM d yyyy k:mm:ss zzz' ), ', ', e.target.name, ',', e.target.value)
    // const test = new Date(e.target.value).toUTCString()
    // console.log('Date:', selectedCalendarEvent.end, ', formatted: ', test, ', ', e.target.name, ',', e.target.value)
    
    if(e.target.name === 'eventStart') {
      return setEventStart(e.target.value)
      // return setSelectedCalendarEvent
      // return setEventStart(test)
    }
    if(e.target.name === 'eventEnd') {
      // console.log('Test:', test)
      return setEventEnd(e.target.value)
    }
  }

  const eventNameChangeHandler = (e) => {
    setSubmitEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  //     var date = new Date();
  //     var now_utc = Date.UTC( date.getUTCFullYear(), 
  //                             date.getUTCMonth(), 
  //                             date.getUTCDate(), 
  //                             date.getUTCHours(), 
  //                             date.getUTCMinutes(), 
  //                             date.getUTCSeconds()
  //                   );
  
  // console.log(new Date(now_utc));
  // console.log(date.toISOString());
  // console.log('date:', date)
  
  //     const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  //     console.log(currentZone)

  useEffect(() => {
    let allEvents = []
    calendarEvents.forEach((cal) => {
      let newCalendarEvents = 
      { 
        id: cal.id, 
        title: cal.title, 
        start: new Date(cal.start),
        end: new Date(cal.end),
        resourceId: cal.resourceId,
        // origstart: cal.start,
        // origend: cal.end,
      }
      allEvents.push(newCalendarEvents)
    })
    setUpdatedCal(allEvents)
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()

    // dispatch(setIsLoadingTrue())

    // let sendingData = {
    //   eventName: eventName,
    //   eventOwner: channelOwner,
    //   eventDateStart: eventStart,
    //   eventDateEnd: eventEnd,
    //   eventDescription: eventDescription,
    //   eventChannel: addCollaborationChannel,
    //   isPrivate: invitationOnly,
    //   channel: channel
    // }
    
    let mutatedData = []
    
    initialData.forEach(data => {
      let desiredDataFormat = {
        id: data.id,
        name: data.name
      }
      mutatedData.push(desiredDataFormat)
    })

    console.log(mutatedData, 'success?')

    // let request = await CreateCollarborationEvent(sendingData)

    // if(request) {
    //   dispatch(setIsLoadingFalse())
    //   setIsEventAddModal(false)
    //   return router.refresh()
    // }

    // return dispatch(setIsLoadingFalse())
  }

  useEffect(() => {

    let addingAttributes = (data) => {
      let receivedData = data //array
      receivedData.forEach(async (individualObject, index) => {
        individualObject.name = `${index + 1}`
      })

      return receivedData
    }


    return () => {
      setMutatedData(addingAttributes(initialData))
    }

  },[])

  return (
    <div>
      <p> Channel Home </p>

    <Transition.Root show={isEventAddModal} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setIsEventAddModal}>
        <Transition.Child as={Fragment}>
          <motion.div 
            className='fixed inset-0 bg-gray-900 bg-opacity-90 transition-opacity block'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          />
        </Transition.Child>

        <div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
          <div className='flex bg-black/20 min-h-full items-center justify-center'>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child as={Fragment}>
              <Dialog.Panel className='flex w-full transform transition max-w-sm text-base'>
                <motion.div
                  className='relative w-full overflow-hidden bg-slate-50 shadow-2xl py-6 rounded-lg'
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.45}}
                >
                  <button className='absolute right-6 top-6 text-gray-400 hover:text-white ' onClick={(e) => setIsEventAddModal(false)}>
                    <MdClose className='w-6 h-6'/>
                  </button>

                  {/* Modal Contents */}
                  <div className="flex flex-col w-full gap-4">
                    {/* Title */}
                    <div className='px-4'>
                      <p className='font-bold text-lg'>Create Collarboration Event</p>
                      { /* <p className='text-sm font-bold text-sky-500'>{channel name?????}</p> */ }
                    </div>

                    <div className='scrollbar-track-sky-950 scrollbar-thumb-white/40'>
                      <div className='overflow-auto scrollbar-thin max-h-96 flex flex-col gap-4 px-4'>
                        {/* eventName */}
                        <div>
                          <div className='flex flex-col gap-1'>
                            <div>
                              <p className='text-xs'>Collarboration Event Name</p>
                            </div>
                            {/* <input type='text' name='eventName' value={ selectedEventTitle && selectedEventTitle } onChange={(e) => eventNameChangeHandler(e)} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0' placeholder='enter event name'/> */}
                            <input type='text' name='eventName' value={ selectedCalendarEvent && selectedCalendarEvent.title } onChange={(e) => eventNameChangeHandler(e)} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0' placeholder='enter event name'/>
                          </div>
                        </div>

                        {/* event date and time */}
                        <div className='flex flex-col gap-2'>
                          <div className='flex flex-row flex-nowrap items-center justify-between w-full gap-2'>
                            <p className='text-xs'>Event starts : </p>
                            {/* <input type='datetime-local' name='eventStart' value={eventStart} onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' /> */}
                            <input type='datetime-local' name='eventStart' value={ eventStart } onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' />
                            {/* <input type='datetime-local' name='eventStart' value={ selectedCalendarEvent && selectedCalendarEvent.start } onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' /> */}
                          </div>
                          <div className='flex flex-row flex-nowrap items-center justify-between w-full gap-2'>
                            <p className='text-xs'>Event ends : </p>
                            {/* <input type='datetime-local' name='eventEnd' value={eventEnd} onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' /> */}
                            {/* <input type='datetime-local' name='eventEnd' value={ selectedCalendarEvent && format(selectedCalendarEvent.end, "yyyy-MM-dd'T'HH:mm:ss") } onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' /> */}
                            <input type='datetime-local' name='eventEnd' value={ eventEnd } onChange={datePickerChangeHandler} className='text-slate-800 text-xs rounded-lg w-2/3' />
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
                          {/* <Switch
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

                          </Switch> */}

                        </div>

                        {/* event description */}

                        <div className='flex flex-col gap-1'>
                          <div>
                            <p className='text-xs'>Event description</p>
                          </div>
                          {/* <textarea value={eventDescription} name='eventDescription' rows={4} onChange={(e) => eventNameChangeHandler(e)} className='text-slate-600 w-full text-xs rounded-lg focus:ring-0 ring-0' placeholder='enter event name'/> */}
                        </div>


                        {/* submit button */}
                        <button onClick={submitHandler} className='w-full bg-sky-800 py-2 rounded-lg text-slate-50 hover:bg-sky-900'>Update Event</button>

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

        <div className="pt-6 pl-24">
          <Calendar
            localizer={localizer}
            style={{ height: '50vh' }}
            views={["day", "week", "month"]}
            // defaultDate={new Date(2024, 10, 18)}
            defaultDate={new Date()}
            defaultView="month"
            
            // events={allEvents}
            events={updatedCal}
            // events={cal}
            // startAccessor="start"
            // endAccessor="end"
            onSelectEvent={onSelectEvent}

            dayLayoutAlgorithm={'no-overlap'}
          />
          {/* <button className='border hover:bg-sky-100 hover:text-red-500' onClick={toggleModal}>toggle</button> */}

        </div>


      <button
        onClick={testButtonHandler}
        className="px-3 py-2 bg-sky-500 text-center hover:bg-sky-800">test button</button>
      <UploadButton 
        endpoint='imageUploader'
        onClientUploadComplete={async (res) => {
          let serverRes = await imageUploadService(res, loggedUser)
          if(serverRes) {
            console.log(serverRes, 'final response')
          }
        }}
        onUploadError={(error) => {
          toast.error(error)
        }}
        onUploadSuccess={(res) => {

          console.log(res, 'res from upload success')
        }}
      />
      <UploadDropzone 
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onDrop={(acceptedFiles) => {
          // Do something with the accepted files
          console.log("Accepted files: ", acceptedFiles);
        }}
      />

    </div>
  );
}
export default ChannelHomePage;