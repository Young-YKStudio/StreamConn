import { MdMoreHoriz, MdReply, MdDelete, MdEdit } from "react-icons/md";
import { useState } from 'react'

export const PostHoverPopUp = ({list, loggedUser, replyId, setReplyId, setEditText}) => {

  const [ moreBox, setMoreBox ] = useState(false)

  const replyClickHandler = (e) => {
    setEditText('')
    setReplyId(list._id)
    console.log(list, loggedUser, 'reply clicked')
  }

  const moreClickHandler = (e) => {
    setMoreBox(!moreBox)
  }

  return (
    <div className="absolute top-1 right-4 flex flex-row gap-1">
      {/* reply */}
      <div className="relative">
        <button
          className="py-1 px-1.5 flex flex-row text-xs text-slate-300 items-center gap-0.5 hover:bg-slate-600 rounded-md"
          onClick={replyClickHandler}
        >
          <MdReply className="w-5 h-5"/> reply
        </button>
      </div>
      {/* option popup */}
      <div className="relative">
        <button
          className="py-1 px-1.5 flex flex-row text-xs text-slate-300 items-center gap-0.5 hover:bg-slate-600 rounded-md"
          onClick={moreClickHandler}
        >
          <MdMoreHoriz className="w-5 h-5"/>
          Options
        </button>
        {moreBox && <div 
            className="absolute top-8 right-0 bg-slate-700 shadow-md rounded-md text-xs p-3 flex flex-row gap-2"
          >
            <button className="flex flex-row gap-0.5 items-center">
              <MdEdit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex flex-row gap-0.5 items-center hover:bg-white/20 py-1 px-2 rounded-md  text-red-500">
              <MdDelete className="w-4 h-4" />
              Delete
            </button>
          </div>
        }
      </div>
    </div>
  )
}