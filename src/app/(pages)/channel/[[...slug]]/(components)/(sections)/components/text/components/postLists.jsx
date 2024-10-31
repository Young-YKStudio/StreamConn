import { useState } from 'react'
import { formatTimeInTimeZone } from './postDateFormat'
import { PostHoverPopUp } from './postHoverPop'
import { BodyMarkDown } from './bodyMarkDown'
import { ReplyPost } from './inputs/editPost'
import { MdTurnLeft, MdAddCircle } from "react-icons/md";
import { IndividualComment } from './comments/IndividualComment'
import { InterActionBar } from './interactions/InterActionBar'

export const PostLists = ({lists, loggedUser, replyId, setReplyId, channel}) => {

  const [ hoveredList, setHoveredList ] = useState()
  const [ editText, setEditText ] = useState('')
  const [ replyText, setReplyText ] = useState('')

  if(lists.length === 0) {
    return (
      <p>No Post</p>
    )
  }

  let sortedList = lists.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="flex flex-col gap-1 w-full">
      {lists && sortedList.map((list, i) => {
        return (
          <div
            key={list._id + 'posts in lists'}
            className={`relative p-2 pb-6 flex flex-row gap-2 w-full + ${hoveredList === i && 'bg-slate-900 rounded-md'}`}
            onMouseEnter={(e) => setHoveredList(i)}
            onMouseLeave={(e) => setHoveredList()}
          >
            {/* profile pic */}
            <div className="flex items-start">
              <img src={list.postOwner.profile} alt={`Post owner photo ${list.postOwner._id}`} className="w-6 h-6 rounded-full"/>
            </div>
            {/* contents */}
            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-row gap-2 items-center">
                {/* ID and time */}
                <p className='font-bold'>{list.postOwner.nickname}</p>
                <p className='text-xs italic'>{formatTimeInTimeZone(list.createdAt)}</p>
              </div>
              <div className='w-full'>
                {/* body */}
                <BodyMarkDown text={list.body} />
                <InterActionBar />
                {list.comments.length > 0 && list.comments.map(comment => { 
                  return <div className='flex flex-row flex-nowrap'>
                    <MdTurnLeft className='w-5 h-5 text-gray-300 rotate-180 mr-2'/>
                    <IndividualComment comment={comment}/>
                  </div>
                })}
                {replyId === list._id && <ReplyPost replyText={replyText} setReplyText={setReplyText} setReplyId={setReplyId} loggedUser={loggedUser} list={list} channel={channel} />}
              </div>
              {hoveredList === i && <PostHoverPopUp list={list} loggedUser={loggedUser} replyId={replyId} setReplyId={setReplyId} setEditText={setEditText} />}
            </div>

          </div>
        )
      })}
    </div>
  )
}