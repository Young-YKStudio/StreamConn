'use client'
import { useDispatch } from "react-redux";

const ChannelHomePage = ({foundUser}) => {

  const dispatch = useDispatch()

  const testButtonHandler = (e) => {
  }

  return (
    <div>
      <p> Team Channel Home </p>
      <button
        onClick={testButtonHandler}
        className="px-3 py-2 bg-sky-500 text-center hover:bg-sky-800">test button</button>
    </div>
  );
}
export default ChannelHomePage;