'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoadingTrue, setIsLoadingFalse } from '@/redux/slice'
import { NewPostCollarboration } from '@/redux/service/collarborationAddPost'
import { useRouter } from 'next/navigation'

const CollaborationRender = ({channel}) => {

  const [ inputtedText, setInputtedText ] = useState('')

  const router = useRouter()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.redux.auth)


  const inputChangeHandler = (e) => {
    setInputtedText(e.target.value)
  }

  console.log(channel,)

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
      console.log('success')
      return router.refresh()
    }
    dispatch(setIsLoadingFalse())
  }

  return (
    <div>
      <div>
        {channel && channel.posts.map((post) => {
          return <div
            key={'colloaboration post' + post.id}
          >
            {post.body}
          </div>
        })}
      </div>

      <div>
        <input type='text' value={inputtedText} onChange={inputChangeHandler} className='text-slate-800' />
        <button onClick={submitHandler}>submit</button>
      </div>
    </div>
  );
}
export default CollaborationRender;