'use client'

import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast'

const ChannelHomePage = ({foundUser}) => {



  const testButtonHandler = (e) => {
    console.log('button clicked')
    toast.error('test error')
  }

  return (
    <div>
      <p> Channel Home </p>
      <button
        onClick={testButtonHandler}
        className="px-3 py-2 bg-sky-500 text-center hover:bg-sky-800">test button</button>
    </div>
  );
}
export default ChannelHomePage;