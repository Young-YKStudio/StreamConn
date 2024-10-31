import { formatInTimeZone } from 'date-fns-tz'
import { format, differenceInHours, differenceInMinutes, formatISO } from 'date-fns'

export const formatTimeInTimeZone = (inputtedTime) => {

  const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  let returnedTime = formatInTimeZone(inputtedTime, currentZone, 'yyyy-MM-dd HH:mm:ss')
  let date = format(returnedTime, 'MM/dd/yyyy h:mmaaa')
  let now = new Date()
  let dateISO = formatISO(returnedTime)
  let dateNowISO = formatISO(now)
  const differenceResultHour = differenceInHours(dateNowISO, dateISO)
  const differenceResultMinutes = differenceInMinutes(dateNowISO, dateISO)

  if(differenceResultHour <= 0 && differenceResultMinutes <=1) {
    return 'just now'
  }

  if(differenceResultHour <= 0) {
    return `${differenceResultMinutes} minutes ago`
  }

  if(differenceResultHour <= 6) {
    return `${differenceResultHour} hours ago`
  }

  return date
}