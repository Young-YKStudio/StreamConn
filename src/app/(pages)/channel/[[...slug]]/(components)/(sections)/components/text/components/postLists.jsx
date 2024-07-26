export const PostLists = (lists) => {
  if(lists.lists.length === 0) {
    return (
      <p>No Post</p>
    )
  }

  return (
    <div>
      {lists && lists.lists.map((list) => {
        return (
          <div
            key={list._id + 'posts in lists'}
          >
            <p>{list.body}</p>
          </div>
        )
      })}
    </div>
  )
}