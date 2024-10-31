'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { NewPostCollarboration } from '@/redux/service/collarborationAddPost'
import { useRouter } from 'next/navigation'
import CollarbLeftList from './parts/listbox/collarbList'
import CollaboEvents from './parts/contents/collaboEvents'
import AddCollarbModal from './parts/modal/addCollarbModal'
import FinishCollaboModal from './parts/modal/finishCollaboModal'

const CollaborationRender = ({channel}) => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ isLoggedAuthMod, setIsLoggedAuthMod ] = useState(false)
  const [ isEventAddModal, setIsEventAddModal ] = useState(false)
  const [ selectedCollaraborationIndex, setSelectedCollaraborationIndex ] = useState(0)
  const [ addCollaborationChannel, setAddCollaborationChannel ] = useState()
  const [ finishSetupModal, setFinishSetupModal ] = useState(false)
  const [ selectedEventForSetup, setSelectedEventForSetup ] = useState()

  const router = useRouter()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.redux.auth)

  useEffect(() => {
    //TODO: authConditions => if channel owner is loggedUser or loggedUser is one of the admins from channel owner's moderator array
    if(loggedUser && channel) {
      if(loggedUser._id === channel.channelOwner._id){
        return setIsLoggedAuthMod(true)
      }
    }
  }, [loggedUser, channel])

  return (
    <div className='flex flex-row flex-nowrap justify-start w-full h-full max-w-4xl'>
      <CollarbLeftList 
        list={channel.foundChannel} 
        selectedCollaraborationIndex={selectedCollaraborationIndex} 
        setSelectedCollaraborationIndex={setSelectedCollaraborationIndex}  
        isEventAddModal={isEventAddModal} 
        setIsEventAddModal={setIsEventAddModal}
        addCollaborationChannel={addCollaborationChannel}
        setAddCollaborationChannel={setAddCollaborationChannel}
      />
      <div className='w-full p-4 flex flex-col gap-2'>
        <CollaboEvents 
          events={channel} 
          selectedCollaraborationIndex={selectedCollaraborationIndex} 
          finishSetupModal={finishSetupModal}
          setFinishSetupModal={setFinishSetupModal}
          selectedEventForSetup={selectedEventForSetup}
          setSelectedEventForSetup={setSelectedEventForSetup}
        />
        {isEventAddModal && <AddCollarbModal 
          isEventAddModal={isEventAddModal} 
          setIsEventAddModal={setIsEventAddModal} 
          channel={channel} 
          channelOwner={channel.channelOwner._id} 
          addCollaborationChannel={addCollaborationChannel}
          />
        }
        {finishSetupModal && <FinishCollaboModal 
            event={selectedEventForSetup} 
            finishSetupModal={finishSetupModal}
            setFinishSetupModal={setFinishSetupModal}
            loggedUser={loggedUser}
          />
        }
      </div>
    </div>
  );
}
export default CollaborationRender;