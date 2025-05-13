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
  const [ moreBox, setMoreBox ] = useState()

  if(lists.length === 0) {
    return (
      <p>No Post</p>
    )
  }

  let sortedList = lists.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="flex flex-col w-full">
      {lists && sortedList.map((list, i) => {
        return (
          <div
            key={list._id + 'posts in lists'}
            className={`relative p-2 pb-6 flex flex-row gap-2 w-full + ${hoveredList === list._id && 'bg-sky-400 rounded-md'} + ${i === 0 && 'border-sky-400 border-t-2 mt-4'} + ${i+1 === sortedList.length && 'border-sky-400 border-b-2'}`}
            onMouseEnter={(e) => setHoveredList(list._id)}
            onMouseLeave={(e) => setHoveredList()}
          >
            {/* profile pic */}
            <div className="flex items-start justify-center">
              <img src={list.postOwner.profile} alt={`Post owner photo ${list.postOwner._id}`} className="aspect-square w-12 rounded-full"/>
            </div>
            {/* contents */}
            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-row gap-2 items-center">
                {/* ID and time */}
                <p className={` font-squadaOne italic text-2xl text-sky-500 tracking-wider + ${hoveredList === list._id && 'text-white'}`}>{list.postOwner.nickname}</p>
                <p className='text-xs italic text-slate-500'>{formatTimeInTimeZone(list.createdAt)}</p>
              </div>
              <div className='w-full'>
                {/* body */}
                <BodyMarkDown text={list.body} />
                {replyId === list._id && <ReplyPost replyText={replyText} setReplyText={setReplyText} setReplyId={setReplyId} loggedUser={loggedUser} list={list} channel={channel} hoveredList={hoveredList} />}
                {list.comments.length > 0 && list.comments.map((comment, i) => { 
                  return <div className='flex flex-row text-pretty' key={i + 'comment box'
                  }>
                    <MdTurnLeft className={`w-5 h-5 rotate-180 mr-2 + ${hoveredList === comment.postId ? "text-white" : 'text-sky-400'}`}/>
                    <IndividualComment comment={comment} hoveredList={hoveredList} />
                  </div>
                })}
              </div>
              {/* {hoveredList === i && <PostHoverPopUp list={list} loggedUser={loggedUser} replyId={replyId} setReplyId={setReplyId} setEditText={setEditText} />} */}
              <InterActionBar list={list} loggedUser={loggedUser} replyId={replyId} setReplyId={setReplyId} setEditText={setEditText} channel={channel} setReplyText={setReplyText} moreBox={moreBox} setMoreBox={setMoreBox} />
            </div>

          </div>
        )
      })}
    </div>
  )
}
