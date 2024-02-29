'use client'

import axios from 'axios'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ViewPost( { params } ) {
  const [ oneData, setOneData ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')
  const [ user, setUser ] = useState('')

  const router = useRouter()
  const id = params.id

  useEffect(() => {
    const requestToGetOnePost = async () => {
      const res = await axios.post('/api/getOnePost', id)
      if(res.status === 200) {
        setOneData(res.data.data)
        setTitle(res.data.data.title)
        setBody(res.data.data.body)
        setUser(res.data.data.user)
      }
    }
    requestToGetOnePost()
  }, [])

  const saveHandler = (e, id) => {
    let data = { id: id, title: title, body: body, user: user }

    const requestToSave = async () => {
      const res = await axios.post('/api/savePost', data)
      if(res.status === 200) {
        router.push('/tutorial')
      }
    }
    requestToSave()
  }
    
  const deleteHandler = (e, id) => {
    let data = { 
      id: id, 
    }

    const requestToDelete = async () => {
      const res = await axios.put('/api/deletePost', data)
      if(res.status === 200) {
        setOneData([])
        router.push('/tutorial')
      }
    }
    requestToDelete()
  }

  const cancelHandler = () => {
    router.push('/tutorial')
  }

  return (
    <div className="pt-24">
      <div>
        <p>Title:{ oneData && oneData.title }
          <input type='text' value={title} className='rounded-md text-black' onChange={e => setTitle(e.target.value)} />
        </p>
        <p>Body: { oneData && oneData.body  }
          <input type='text' value={body} className='rounded-md text-black' onChange={e => setBody(e.target.value)} />
        </p>
        <p>User: { oneData && oneData.user  }
          <input type='text' value={user} className='rounded-md text-black' onChange={e => setUser(e.target.value)} />
        </p>
      </div>
      <div>
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => saveHandler(e, id)}>Save</button>
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => deleteHandler(e, id)}>Delete</button>
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => cancelHandler()}>Cancel</button>
      </div>
    </div>
  );
}
