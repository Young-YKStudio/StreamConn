'use client'

const RenderingPosts = ({returnedPosts}) => {
  console.log(returnedPosts, 'at post render')
  return (
    <section>
      {returnedPosts && 
        <div>
          {returnedPosts.map((post) => {
            return <div key={post._id}>
              <p>{post.body}</p>
            </div>
          })}
        </div>
      }
    </section>
  );
}
export default RenderingPosts;