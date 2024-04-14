'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { NewPostCollarboration } from '@/redux/service/collarborationAddPost'
import { useRouter } from 'next/navigation'
import CollarbLeftList from './parts/collarbList'
import AddCollarbButton from './parts/addCollarbButton'

const CollaborationRender = ({channel}) => {

  const [ inputtedText, setInputtedText ] = useState('')
  const [ isLoggedAuthMod, setIsLoggedAuthMod ] = useState(false)
  const [ isEventAddModal, setIsEventAddModal ] = useState(false)

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



  const inputChangeHandler = (e) => {
    setInputtedText(e.target.value)
  }

  const submitHandler = async (e) => {

    dispatch(setIsLoadingTrue())

    let sendingData = {
      author: loggedUser._id,
      channelOwnerId: channel.channelOwner,
      channel: channel._id,
      body: inputtedText
    }

    let request = await NewPostCollarboration(sendingData)
    if(request) {
      dispatch(setIsLoadingFalse())
      return router.refresh()
    }
    dispatch(setIsLoadingFalse())
  }

  return (
    <div className='flex flex-row flex-nowrap justify-start w-full h-full'>
      <CollarbLeftList list={channel.collarborations} />
      <div className='w-full p-4'>
        {isLoggedAuthMod && <AddCollarbButton isEventAddModal={isEventAddModal} setIsEventAddModal={setIsEventAddModal} />}
        <p>right side?</p>
      </div>
    </div>
  );
}
export default CollaborationRender;