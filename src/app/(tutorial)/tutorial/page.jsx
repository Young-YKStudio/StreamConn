'use client'

import { useState } from "react"

const tutorial = () => {

  const [ todo, setTodo ] = useState('')

  const addHandler = async () => {
    console.log('Add clicked')

    // try {
    //   const request = await axios.get('/api/registerTask', data)
    //   if(request.data) {
    //     console.log(request.data, 'call success')
    //   }
    // } catch (e) {
    //   console.log(e, 'call fail')
    // }

  }

  return (
    <div className="pt-24">
      <div className="flex flex-row gap-2">
        <label>To Do:</label>
        <input type='text' value={todo} className='rounded-md text-black' onChange={e => setTodo(e.target.value)} />
        <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={addHandler}>Add</button>
      </div>
    </div>
  );
}
export default tutorial;