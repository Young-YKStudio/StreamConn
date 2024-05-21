import axios from 'axios'
import { toast } from 'react-hot-toast'
import { isBefore } from 'date-fns'
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'

export const CreateCollarborationEvent = async (data) => {

  const now = new Date()

  const validation = (data) => {
    if(data.eventName === '') {
      toast.error('Please provide a event name')
      return false
    }
    if(data.eventDateStart === '') {
      toast.error('Please provide an event start date and time')
      return false
    }
    if(data.eventDateEnd === '') {
      toast.error('Please provide an event end date and time')
      return false
    }

    const isStartDateBeforeToday = isBefore(data.eventDateStart, now)
    if(isStartDateBeforeToday) {
      toast.error('Event start date must be in the future date and time')
      return false
    }

    const isEndDateBeforeToday = isBefore(data.eventDateEnd, now)
    if(isEndDateBeforeToday) {
      toast.error('Event end date must be in the future date and time')
      return false
    }

    const isendDateBeforeStartDay = isBefore(data.eventDateEnd, data.eventDateStart)
    if(isendDateBeforeStartDay) {
      toast.error('Event end date must be after event start date')
      return false
    }

    if(data.eventDescription === '') {
      toast.error('Please provide an event description')
      return false
    }

    return true
  }

  let isValidated = validation(data)

  if(!isValidated) {
    return false
  }

  const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const uploadingTime = (time) => {
    let returningTime = formatInTimeZone(time, currentZone, 'yyyy-MM-dd HH:mm:ss')
    let formattedTime = fromZonedTime(returningTime)
    return formattedTime
  }

  const formattedData = {
    eventName: data.eventName,
    eventOwner: data.eventOwner,
    eventDateStart: uploadingTime(data.eventDateStart),
    eventDateEnd: uploadingTime(data.eventDateEnd),
    eventDescription: data.eventDescription,
    isPrivate: data.isPrivate,
    channel: data.channel,
    eventChannel: data.eventChannel
  }

  try {
    const res = await axios.post('/api/collarboration/createNewEvent', formattedData)
    if(res.status === 200) {
      return true
    }
  } catch (err) {
    toast.error(err.response.data.message)
    return false
  }
} 