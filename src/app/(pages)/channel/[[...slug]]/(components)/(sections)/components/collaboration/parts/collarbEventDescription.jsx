import { formatInTimeZone } from 'date-fns-tz'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CollarbEventDescription = ({event}) => {

  console.log(event, 'at rightside')

  const currentZone =  Intl.DateTimeFormat().resolvedOptions().timeZone

  const formatTime = (time) => {
    let formattedTime = formatInTimeZone(time, currentZone, 'yyyy-MM-dd HH:mm')
    return formattedTime
  }

  if(event) {
    return (
      <div className='w-full'>
        {/* event name */}
        <p className='text-2xl font-bold'>{event.eventName}</p>
        {/* event image */}
        <div>
          <div
            className='bg-white/10 w-full h-48 rounded-lg flex justify-center items-center'
          >
            <button>Click to add Image</button>
          </div>
        </div>
        {/* event date? */}
        <p>{formatTime(event.eventDateStart)} - {formatTime(event.eventDateEnd)}</p>
        {/* event description */}
        <div className='flex flex-col items-center gap-2'>
          <div className='w-full font-bold'>
            <p>About {event.eventName} Collarboration</p>
          </div>
          <ReactMarkDown className='bg-white/80 text-black prose prose-sky p-4 rounded-lg w-full' remarkPlugins={[remarkGfm]}>
            {event.eventDescription}
          </ReactMarkDown>
        </div>

      </div>
    );
  } else {
    return (
      <p>no data</p>
    )
  }
}
export default CollarbEventDescription;