import { isBefore, isAfter } from 'date-fns'
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const now = new Date()
const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const boxBackgroundStyles = (status) => {
  if(status === 'future') {
    return 'p-4 rounded-lg shadow-lg bg-white/90 flex flex-col w-full text-slate-800 text-sm gap-2'
  }

  if(status === 'past') {
    return 'p-4 rounded-lg shadow-lg bg-white/40 flex flex-col w-full text-slate-800 text-sm gap-2'
  }

  if(status === 'unfinished') {
    return 'rounded-lg shadow-lg bg-yellow-600/80 flex flex-col w-full text-slate-800 text-sm gap-2 pb-2'
  }

  return 'p-4 rounded-lg shadow-lg bg-white/90 flex flex-col w-full text-slate-800 text-sm gap-2'
}

const dateStyles = (status) => {
  if(status === 'past') {
    return 'text-xs text-slate-300'
  }

  if(status === 'unfinished') {
    return 'text-xs text-white'
  }

  return 'text-xs text-slate-500'
}

const statusBadgeStyles = (status) => {
  if(status === 'future') {
    return <div className='px-4 py-1.5 rounded-full bg-green-500 text-white text-xs tracking-wider'>
      <p>Upcoming Event</p>
    </div>
  }

  if(status === 'past') {
    return <div className='px-4 py-1.5 rounded-full bg-red-500 text-white text-xs tracking-wider'>
      <p>Closed Event</p>
    </div>
  }

  return <div className='px-4 py-1.5 rounded-full bg-sky-500 text-white text-xs tracking-wider'>
    <p>Open Event</p>
  </div>
}

const eventActive = (eventStart, eventEnd) => {
  let eventStartCurrentZone = formatInTimeZone(eventStart, currentZone, 'yyyy-MM-dd HH:mm:ss')
  let eventEndCurrentZone = formatInTimeZone(eventEnd, currentZone, 'yyyy-MM-dd HH:mm:ss')

  if(isAfter(eventStartCurrentZone, now)) {
    return 'future'
  }

  if(isBefore(eventEndCurrentZone, now)) {
    return 'past'
  }

  return 'current'
}

const CollaboListforMods = ({eventsSettingUnfinished, eventsSettingCompleted, finishSetupModal, setFinishSetupModal, selectedEventForSetup, setSelectedEventForSetup}) => {

  // console.log(eventsSettingCompleted, eventsSettingUnfinished, 'at list mods')

  // let eventStatusByDate = eventActive(event.eventDateStart, event.eventDateEnd)

  const finishSetupButtonHandler = (e, event) => {
    if(selectedEventForSetup) {
      setSelectedEventForSetup()
    }
    setFinishSetupModal(!finishSetupModal)
    setSelectedEventForSetup(event)
  }

  return (
    <div className='flex flex-col gap-2'>
      {eventsSettingUnfinished.length > 0 &&
        <div className='flex flex-col gap-2'>
          <p className='text-xl'>Pending Events <span className='text-xs pl-2 italic'>Pending events are not showing up for users</span></p>
          <div className='grid grid-cols-2 gap-4 shadow-lg'>
            {eventsSettingUnfinished.map((event) => {
              return <div
                className={boxBackgroundStyles('unfinished')}
                key={event._id + '_ unfinished events'}
              >
                <div className='flex flex-col justify-between items-center gap-2 aspect-[5/3]'>
                  <div className='relative aspect-[16/9] w-full bg-cover bg-center bg-blend-darken bg-black/60 rounded-t-lg' style={{backgroundImage: "url('https://www.bootstrapdash.com/blog/wp-content/uploads/2020/04/gaming-website-template.jpg')"}}>
                    <div className='absolute top-6 left-4'>
                      <p className='font-bold text-xl text-white'>{event.eventName}</p>
                      <p className={dateStyles('unfinished')}>{formatInTimeZone(event.eventDateStart, currentZone, 'MMM/do/yyyy HH:mmaaa')} ~ {formatInTimeZone(event.eventDateEnd, currentZone, 'MMM/do/yyyy HH:mmaaa')}</p>
                    </div>
                  </div>
                  <button 
                    className='bg-red-700 px-4 py-2 rounded-md text-white hover:bg-red-900'
                    onClick={(e) => finishSetupButtonHandler(e, event)}
                  >
                    Finish Setup
                  </button>
                </div>
              </div>
            })}
          </div>
        </div>
      }
    </div>
    // <p>temp text for list for mods</p>
    // <div 
    //   className={boxBackgroundStyles(eventStatusByDate)}
    // >
    //   {/* title and buttons */}
    //   <div className='w-full flex flex-row items-center justify-between'>
    //     <div>
    //       <p className="truncate font-bold text-2xl text-sky-900">{event.eventName}</p>
    //       <p className={dateStyles(eventStatusByDate)}>{formatInTimeZone(event.eventDateStart, currentZone, 'MMM/do/yyyy HH:mmaaa')} ~ {formatInTimeZone(event.eventDateEnd, currentZone, 'MMM/do/yyyy HH:mmaaa')}</p>
    //     </div>
    //     {statusBadgeStyles(eventStatusByDate)}
    //   </div>

    //   {/* Image */}
    //   {/* description */}
    //   <div className='flex flex-col gap-1'>
    //     <p className='font-bold'>About this collaboration event</p>
    //     <ReactMarkDown
    //       remarkPlugins={[remarkGfm]}
    //       className='prose prose-sky'
    //     >
    //       {event.eventDescription}
    //     </ReactMarkDown>
    //   </div>
    // </div>
  );
}
export default CollaboListforMods;