'use client'

import axios from 'axios'

const RenderingPosts = ({mode, setMode, returnedPosts, isReplyActive, setIsReplyActive, selectedPost, setSelectedPost, inputtedText, setInputtedText, isEditActive, setIsEditActive}) => {

  const replyHandler = (e, id) => {
    if (selectedPost == undefined) {
      let foundPost = returnedPosts.find(({ _id }) => _id == id )
      if (foundPost) {
        setSelectedPost(foundPost)
        setIsReplyActive(true)
        setMode('reply')
      }      
    } else if (id == selectedPost._id) {
      if (isReplyActive) {
        setIsReplyActive(false)
        setMode('new')
      } else {
        setIsReplyActive(true)
        setMode('reply')
      }
    } else {
      let foundPost = returnedPosts.find(({ _id }) => _id == id )
      if (foundPost) {
        setSelectedPost(foundPost)
        setIsReplyActive(true)
        setMode('reply')
      }      
    }

    setInputtedText('')
    setIsEditActive(false)
  }

  const editHandler = (e, id) => {
    if (selectedPost == undefined) {
      let foundPost = returnedPosts.find(({ _id }) => _id == id )
      if (foundPost) {
        setSelectedPost(foundPost)
        setInputtedText(foundPost.body)
        setIsEditActive(true)
        setMode('edit')
      }      
    }
    else if (selectedPost._id == id) {
      if (isEditActive) {
        setInputtedText('')
        setIsEditActive(false)
        setMode('new')
      } else {
        setInputtedText(selectedPost.body)
        setIsEditActive(true)
        setMode('edit')
      }
    } else {
      let foundPost = returnedPosts.find(({ _id }) => _id == id )
      if (foundPost) {
        setSelectedPost(foundPost)
        setInputtedText(foundPost.body)
        setIsEditActive(true)
        setMode('edit')
      }
    }

    setIsReplyActive(false)
  }
  
  const deleteHandler = (e, id) => {
    setMode('delete')
    setInputtedText('')
    setIsEditActive(false)
    setIsReplyActive(false)

    let data = { 
      id: id, 
    }

    const requestToDelete = async () => {
      const res = await axios.put('/api/deletePost', data)
      if(res.status === 200) {
        window.location.reload()
      }
    }
    requestToDelete()
  }

  return (
    <section className='pt-24 pl-4'>
      {returnedPosts && 
        <div className="flex flex-col gap-2">
          {returnedPosts.map((post) => {
            return <div key={post._id}>
              <p className="flex flex-row gap-3">{post.body}
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => replyHandler(e, post._id)}>Reply</button>
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => editHandler(e, post._id)}>Edit</button>
                <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => deleteHandler(e, post._id)}>Delete</button>
              </p>
            </div>
          })}
        </div>
      }
    </section>
  );
}

export default RenderingPosts;