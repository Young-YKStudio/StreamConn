import { useState, useEffect } from 'react'
import { MdMoreVert } from 'react-icons/md'
import SubLinksPopUp from './subLinksPopUp';
import { usePathname } from 'next/navigation';

const SubLinks = () => {

  const [ isPopUpOpen, setIsPopUpOpen ] = useState(false)

  const path = usePathname()

  const popUpbuttonHandler = (e) => {
    setIsPopUpOpen(!isPopUpOpen)
  }

  useEffect(() => {
    return setIsPopUpOpen(false)
  },[path])

  const buttonStyleDistributor = (state) => {
    if(state) {
      return 'flex justify-center items-center p-2 rounded-md bg-sky-800'
    }

    return 'flex justify-center items-center p-2 rounded-md bg-sky-950 hover:bg-sky-800'
  }

  return (
    <div className='relative'>
      <button onClick={popUpbuttonHandler} className={buttonStyleDistributor(isPopUpOpen)}>
        <MdMoreVert className='w-5 h-5 text-slate-200' />
      </button>

      {isPopUpOpen && <SubLinksPopUp />}
    </div>
  );
}
export default SubLinks;