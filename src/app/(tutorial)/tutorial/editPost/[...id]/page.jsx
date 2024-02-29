'use client'

import axios from 'axios'

const EditPost = ( { params } ) => {
  console.log('params: ', params)
  // const buttonHandler = async (e) => {
  //   console.log('button clicked')

  //   let data = {
  //     title: 'test1234'
  //   }

  //   try {
  //     const request = await axios.post('/api/registerTask', data)
  //     if(request.data) {
  //       console.log(request.data, 'call success')
  //     }
  //   } catch (e) {
  //     console.log(e, 'call fail')
  //   }
  // }

  return (
    <div className="pt-24">
      <p>Post edit page</p>
      {/* <button className='px-4 py-2 bg-sky-500' onClick={buttonHandler}>call api</button> */}
    </div>
  );
}
export default EditPost;