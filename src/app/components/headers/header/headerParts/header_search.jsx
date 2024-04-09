import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeaderSearchPopUp from './headerSearchPopUp'

const Header_SearchBox = () => {

  const [ searchedText, setSearchedText ] = useState('')
  const [ searchedStreamers, setSearchedStreamers ] = useState([])

  const allStreamers = useSelector(state => state.redux.allStreamers)


  const searchButtonHandler = (e) => {
    setSearchedText(e.target.value)
  }

  useEffect(() => {
    if(allStreamers) {
      let tempStreamers = allStreamers.filter(streamer => streamer.nickname.toLowerCase().includes(searchedText.toLowerCase()))
      setSearchedStreamers(tempStreamers)
    }
    if(searchedText === '') {
      setSearchedStreamers([])
    }
  },[searchedText])

  return (
    <div className="flex flex-row flex-nowrap justify-center relative">
      <input type='text' value={searchedText} placeholder='Search streamers' onChange={(e) => setSearchedText(e.target.value)} className="max-w-xs w-full text-slate-400 px-4 py-1 bg-transparent rounded-md focus:outline-none focus:ring-0"/>
      {searchedStreamers.length > 0 && <HeaderSearchPopUp searchedStreamers={searchedStreamers} />}
    </div>
  );
}
export default Header_SearchBox;