'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const Example = () => {

  const localizer = momentLocalizer(moment)


  return (
    <div className="flex h-full w-full flex-col">
      <div className='pl-24'>
        <Calendar
          localizer={localizer}
          // events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>

    </div>
  )
}

export default Example