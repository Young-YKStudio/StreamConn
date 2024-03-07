'use client'

const RenderingPosts = ({returnedPosts, isReplyActive, setIsReplyActive}) => {
  console.log(returnedPosts, 'at post render')
  return (
    <section>
      {returnedPosts && 
        <div>
          {returnedPosts.map((post) => {
            return <div key={post._id}>
              <p>{post.body}</p>
              <button>edit</button>
              <button onClick={(e) => setIsReplyActive(!isReplyActive)}>reply</button>
              <button>delete</button>
            </div>
          })}
        </div>
      }
    </section>
  );
}
export default RenderingPosts;