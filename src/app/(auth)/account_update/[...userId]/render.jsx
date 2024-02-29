'use client'

import { useState } from 'react'

const Account_Update_Render = (user) => {

  const [ currentPage, setCurrentPage ] = useState('')
  
  console.log(user)
  return (
    <section className='pt-20'>
      <h1>Update User</h1>
      <div>
        <h1>Welcome to Stream Connect</h1>

      </div>
    </section>
  );
}
export default Account_Update_Render;