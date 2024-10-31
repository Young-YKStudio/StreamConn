import { MdMoreHoriz, MdReply, MdDelete, MdEdit, MdOutlineThumbUp } from "react-icons/md";
import { LikeInteraction } from "./actions/LikeInteraction";
import { ReplyInteraction } from "./actions/ReplyInteraction";
import { MoreInteraction } from "./actions/MoreInteraction";

export const InterActionBar = () => {
  return (
    <div className="flex flex-row gap-2">
      {/* likes */}
      <div>
        <LikeInteraction />
      </div>
      {/* reply */}
      <div>
        <ReplyInteraction />
      </div>
      {/* user button */}
      <div>
        <MoreInteraction />
      </div>
    </div>
  )
}