import { useState } from 'react'
import CollaboIndividualList from './individualList'

const CollaboEvents = ({events, selectedCollaraborationIndex, finishSetupModal, setFinishSetupModal, selectedEventForSetup, setSelectedEventForSetup}) => {

  const [ selectedEvent, setSelectedEvent ] = useState('')
  const [ eventModalOpen, setEventModalOpen ] = useState(false)

  let foundEvent = events.foundChannel[selectedCollaraborationIndex]

  if(foundEvent){

    let sortedCollaborations = foundEvent.collarborations.sort((a, b) => Date.parse(b.eventDateStart) - Date.parse(a.eventDateStart))

    return (
      <div className="w-full flex flex-col gap-2">
        <div className='flex flex-row justify-between items-center'>
          <p className='font-bold text-sky-500 capitalize text-xl'>{foundEvent.channelName}</p>
        </div>
        {eventModalOpen && <p>Modal, {selectedEvent}</p>}
        <div className='flex flex-col gap-4 bg-sky-900 p-4 rounded-lg'>
          {foundEvent && <CollaboIndividualList 
              list={sortedCollaborations} 
              channel={foundEvent} 
              finishSetupModal={finishSetupModal}
              setFinishSetupModal={setFinishSetupModal}
              selectedEventForSetup={selectedEventForSetup}
              setSelectedEventForSetup={setSelectedEventForSetup}
            />
          }
        </div>
      </div>
    );
  }
}
export default CollaboEvents;