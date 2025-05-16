'use client'; // For client-side rendering

import 'react-big-calendar/lib/css/react-big-calendar.css'
// @import 'react-big-calendar/lib/sass/styles';
// @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD

import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import { useState, useEffect, useRef, useCallback } from "react";

// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { format, parse, startOfWeek, getDay } from "date-fns";
import { formatInTimeZone } from 'date-fns-tz'

import { myevents, myresources } from './data';
import AddModal from './addModal'

import { useSelector } from 'react-redux'

const locales = {
	"en-US": require("date-fns")
};

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
});

// const getAllCalendarEvent = async (reqData) => {
//   const calendarEvent = await axios.post(`${process.env.APP_URL}/api/getAllCalendarEvent`, reqData);

//   if(calendarEvent.status === 200) {
//     return calendarEvent.data
//   }
// }

export default function CalendarTest() {
// const CalendarTest = async () => { 
  const [ isEventAddModal, setIsEventAddModal ] = useState(false)
  const currentLoggedUser = useSelector(state => state.redux.auth)

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
    }, 250)
  }, [])

  const toggleModal = async (e) => {
    e.preventDefault()
    setIsEventAddModal(!isEventAddModal)
    console.log(isEventAddModal)
  }

  // let sendingData = {
  //   calendarOwner: currentLoggedUser,
  //   // channel: params.slug[0],
  //   // channelOwnerNickname: params.slug[1],
  // }

  // const channelData = await getAllCalendarEvent(sendingData)

  return (
    <div className="pt-6 pl-24">
      <Calendar
        localizer={localizer}
        style={{ height: '100vh' }}
        views={["day", "week", "month"]}
        // defaultDate={new Date(2024, 10, 18)}
        defaultDate={new Date()}
        defaultView="month"
        
        events={myevents}
        // startAccessor="start"
        // endAccessor="end"
        onSelectEvent={onSelectEvent}

        dayLayoutAlgorithm={'no-overlap'}
      />
      <button className='border hover:bg-sky-100 hover:text-red-500'
              onClick={toggleModal}>toggle</button>

      {isEventAddModal && <AddModal isEventAddModal={isEventAddModal} setIsEventAddModal={setIsEventAddModal} user={currentLoggedUser} />}

    </div>
  )
}

// export default CalendarTest;