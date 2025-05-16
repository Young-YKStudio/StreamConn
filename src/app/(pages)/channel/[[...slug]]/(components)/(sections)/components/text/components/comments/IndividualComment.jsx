export const IndividualComment = ({comment, hoveredList}) => {
  // console.log(comment)
  if(comment) {
    return (
      <div className="flex flex-row flex-nowrap gap-2 w-full">
        {/* nickname */}
        <div>
          <p className={`${hoveredList === comment.postId ? 'text-white' : 'text-sky-400'} +  font-squadaOne italic`}>{comment.commentOwner.nickname} : </p>
        </div>
        {/* comments */}
        <div className="max-w-[80%]">
          <p className="text-slate-600">{comment.body}</p>
        </div>
        {/* modify interactions */}
      </div>
    )
  }
}