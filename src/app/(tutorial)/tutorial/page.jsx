'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Tutorial() {
  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')
  const [ user, setUser ] = useState('')
  const [ allData, setAllData ] = useState([])

  const router = useRouter()

  useEffect(() => {
    const requestToGet = async () => {
      const res = await axios.get('/api/getAllPosts')
      if(res.data) {
        setAllData(res.data)
      }
    }
    requestToGet()
  }, [])

  const addHandler = () => {
    let data = { title: title, body: body, user: user }

    const requestToAdd = async () => {
      const res = await axios.post('/api/addPost', data)
      if(res.status === 200) {
        setAllData([...allData, res.data])
        setTitle('')
        setBody('')
        setUser('')
      }
    }
    requestToAdd()
  }
  
  const viewHandler = (e, id) => {
    router.push(`/tutorial/viewPost/${id}`)
  }
  
  return (
    <div className="pt-20">
      <div className="flex flex-col gap-3">
        { allData.length > 0 && allData.map((post, i) => {
          return <div key={i} className='flex gap-3'>
            <p>Title: {post.title}, Body: {post.body}, User: {post.user}</p>
            <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => viewHandler(e, post._id)}>View</button>
          </div>
        })}
      </div>
      <div className='flex flex-row gap-5 absolute bottom-5'>
        <label>Title:</label>
        <input type='text' value={title} className='rounded-md text-black' onChange={e => setTitle(e.target.value)} />
        <label>Body:</label>
        <input type='text' value={body} className='rounded-md text-black' onChange={e => setBody(e.target.value)} />
        <label>User:</label>
        <input type='text' value={user} className='rounded-md text-black' onChange={e => setUser(e.target.value)} />
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={addHandler}>Post</button>
      </div>
    </div>
  )
}
