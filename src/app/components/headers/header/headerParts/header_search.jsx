import { MdOutlineSearch } from 'react-icons/md'

const Header_SearchBox = ({searchedText, setSearchedText}) => {

  const searchButtonHandler = (e) => {
    console.log(searchedText, 'search button clicked')
  }

  return (
    <div className="flex flex-row flex-nowrap justify-center">
      <input type='text' value={searchedText} placeholder='Search' onChange={(e) => setSearchedText(e.target.value)} className="max-w-xs w-full text-slate-700 px-4 py-1 bg-slate-900 ring-slate-700 ring-1 rounded-l-md focus:ring-2 focus:outline-none focus:ring-sky-500 ring-inset focus:ring-inset"/>
      <button onClick={searchButtonHandler} className="px-2 py-1 rounded-r-md bg-slate-700 border-slate-700 hover:bg-slate-600"><MdOutlineSearch className='w-6 h-6 text-slate-400'/></button>
    </div>
  );
}
export default Header_SearchBox;