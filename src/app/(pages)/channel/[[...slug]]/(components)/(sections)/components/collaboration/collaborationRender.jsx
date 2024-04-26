'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { NewPostCollarboration } from '@/redux/service/collarborationAddPost'
import { useRouter } from 'next/navigation'
import CollarbLeftList from './parts/collarbList'
import CollaboEvents from './parts/collaboEvents'
import AddCollarbButton from './parts/addCollarbButton'
import AddCollarbModal from './parts/addCollarbModal'
import CollarbEventDescription from './parts/collarbEventDescription'

const CollaborationRender = ({channel}) => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ isLoggedAuthMod, setIsLoggedAuthMod ] = useState(false)
  const [ isEventAddModal, setIsEventAddModal ] = useState(false)
  const [ selectedCollaraborationIndex, setSelectedCollaraborationIndex ] = useState(0)

  const router = useRouter()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.redux.auth)

  useEffect(() => {
    // authConditions => if channel owner is loggedUser or loggedUser is one of the admins from channel owner's moderator array
    if(loggedUser && channel) {
      if(loggedUser._id === channel.channelOwner._id){
        return setIsLoggedAuthMod(true)
      }
    }
  }, [loggedUser, channel])

  return (
    <div className='flex flex-row flex-nowrap justify-start w-full h-full max-w-4xl'>
      <CollarbLeftList list={channel.foundChannel} selectedCollaraborationIndex={selectedCollaraborationIndex} setSelectedCollaraborationIndex={setSelectedCollaraborationIndex}  />
      <CollaboEvents events={channel} selectedCollaraborationIndex={selectedCollaraborationIndex}/>
      <div className='w-full p-4 flex flex-col gap-2'>
        {/* {isLoggedAuthMod && <AddCollarbButton isEventAddModal={isEventAddModal} setIsEventAddModal={setIsEventAddModal} />} */}
        {/* <CollarbEventDescription event={channel.collarborations[selectedCollaraborationIndex]} selectedCollaraborationIndex={selectedCollaraborationIndex} isLoggedAuthMod={isLoggedAuthMod}/> */}
        {isEventAddModal && <AddCollarbModal isEventAddModal={isEventAddModal} setIsEventAddModal={setIsEventAddModal} channel={channel} channelOwner={channel.channelOwner._id} />}
      </div>
    </div>
  );
}
export default CollaborationRender;