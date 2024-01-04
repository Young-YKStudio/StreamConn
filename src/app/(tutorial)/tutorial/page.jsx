'use client'

import axios from 'axios'

const Tutorial = () => {

  const clickHandler = async (e) => {
    try {
      let request = await axios.post('/api/tutorial', {memo: 'tutorial purpose'})
      if(request.data) {
        console.log('request success', request.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <p className="pt-24">Tutorial Page</p>
      <button className="px-4 py-2 bg-sky-500" onClick={clickHandler}>Call API</button>
    </>
  );
}
export default Tutorial;