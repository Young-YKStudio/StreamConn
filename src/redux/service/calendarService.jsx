import axios from 'axios'
import { toast } from 'react-hot-toast'
// import { isBefore } from 'date-fns'
// import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'

export const CreateCalendarEvent = async (data) => {
  console.log('SERVICE Create Calendar', data)

  const formattedData = {
    title: data.title,
    start: data.start,
    end: data.end,
    calendarOwner: data.calendarOwner,
    // eventDescription: data.eventDescription,
    // isPrivate: data.isPrivate,
    // channel: data.channel,
    // eventChannel: data.eventChannel
  }

//   const now = new Date()

  // const validation = (data) => {
  //   if(title === '') {
  //     toast.error('Please provide a event name')
  //     return false
  //   }
  //   if(start === '') {
  //     toast.error('Please provide an event start date and time')
  //     return false
  //   }
//     if(data.eventDateEnd === '') {
//       toast.error('Please provide an event end date and time')
//       return false
//     }

//     const isStartDateBeforeToday = isBefore(data.eventDateStart, now)
//     if(isStartDateBeforeToday) {
//       toast.error('Event start date must be in the future date and time')
//       return false
//     }

//     const isEndDateBeforeToday = isBefore(data.eventDateEnd, now)
//     if(isEndDateBeforeToday) {
//       toast.error('Event end date must be in the future date and time')
//       return false
//     }

//     const isendDateBeforeStartDay = isBefore(data.eventDateEnd, data.eventDateStart)
//     if(isendDateBeforeStartDay) {
//       toast.error('Event end date must be after event start date')
//       return false
//     }

//     if(data.eventDescription === '') {
//       toast.error('Please provide an event description')
//       return false
//     }

//     return true
//   }

  // let isValidated = validation(data)

  // if(!isValidated) {
  //   return false
  // }

//   const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone
//   const uploadingTime = (time) => {
//     let returningTime = formatInTimeZone(time, currentZone, 'yyyy-MM-dd HH:mm:ss')
//     let formattedTime = fromZonedTime(returningTime)
//     return formattedTime
//   }

try {
    const res = await axios.post('/api/calendar/createNewCalendarEvent', formattedData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
} 

// export const searchCollarboUser = async (input) => {
//   let sendingData = {
//     userNickname: input
//   }

//   try {
//     const res = await axios.post('/api/collarboration/searchCollarboUser', sendingData)
//     if(res.status === 200) {
//       let foundStreamers = res.data

//       if (foundStreamers.length === 0 ) {
//         return 'not found'
//       }

//       return foundStreamers
//     }
//   } catch (err) {
//     console.log(err)
//     return undefined
//   }
// }

// export const invitationSetUp = async (data) => {
//   console.log(data, 'data received at service')

//   try {
//     const res = await axios.post('/api/sendInvitation', data)

//     if(res.status === 200) {
//       console.log('call success', res.data)
//       return true
//     }
//   } catch (err) {
//     console.log('call failed', err)
//     return false
//   }

// // TODO: Start from sending invitation backend protocol, and button change in frontend