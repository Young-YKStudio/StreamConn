export const IndividualComment = ({comment}) => {
  console.log(comment)
  if(comment) {
    return (
      <div className="flex flex-row flex-nowrap justify-between w-full">
        {/* comments */}
        <div className="max-w-[80%]">
          <p>{comment.body}</p>
        </div>
        {/* information and buttons */}
        <div>
          <p>{comment.commentOwner.nickname}</p>
        </div>
      </div>
    )
  }
}