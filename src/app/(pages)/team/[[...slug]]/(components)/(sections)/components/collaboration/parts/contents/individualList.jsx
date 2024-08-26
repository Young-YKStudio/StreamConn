import { MdOutlineWarningAmber } from 'react-icons/md'
import CollaboListforMods from './listForMods'
import CollaboListforUsers from './listForUsers'
import CollaboListforPublic from './listForPublic'
import { useSelector } from 'react-redux'

const CollaboIndividualList = ({list, channel, finishSetupModal, setFinishSetupModal, selectedEventForSetup, setSelectedEventForSetup }) => {

  const loggedUser = useSelector((state) => state.redux.auth)

  if(list && loggedUser) {
    if(list.length === 0) {
      return <div
        className='w-full flex justify-center items-center gap-2'
      >
        <MdOutlineWarningAmber className='w-5 h-5 text-yellow-500'/>
        <p>Looks like there is no collaboration events yet.</p>
      </div>
    }
    
    let eventsSettingUnfinished = list.filter((event) => event.eventStatus === 'pending')
    let eventsSettingCompleted = list.filter((event) => event.eventStatus === 'completed')

    // TODO: set for mods
    if(loggedUser._id === channel.channelOwner._id) {
      
      return <CollaboListforMods 
          eventsSettingUnfinished={eventsSettingUnfinished} 
          eventsSettingCompleted={eventsSettingCompleted} 
          finishSetupModal={finishSetupModal}
          setFinishSetupModal={setFinishSetupModal}
          selectedEventForSetup={selectedEventForSetup}
          setSelectedEventForSetup={setSelectedEventForSetup}
        />
    } else {
      return <CollaboListforUsers events={event} />
    }

  }

  if(list) {
    if(list.length === 0) {
      return <div
        className='w-full flex justify-center items-center gap-2'
      >
        <MdOutlineWarningAmber className='w-5 h-5 text-yellow-500'/>
        <p>Looks like there is no collaboration events yet.</p>
      </div>
    }

    let eventsSettingCompleted = list.filter((event) => event.eventStatus === 'completed')

    return <CollaboListforPublic />
  }
}


export default CollaboIndividualList;