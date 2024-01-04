'use client'

import axios from 'axios'

const Landing = () => {

  const buttonHandler = async (e) => {
    console.log('button clicked')

    try {
      let request = await axios.post('/api/registerTask', {name: 'asdf'})

      if(request) {
        console.log('call success', request)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pt-24'>
      <p>Landing Page</p>
      <button className='px-4 py-2 bg-sky-500 rounded-md' onClick={buttonHandler}>TEST API</button>
    </div>
  );
}
export default Landing;