import Link from 'next/link'
import { MdPerson } from 'react-icons/md';

const HeaderSearchPopUp = ({searchedStreamers}) => {
  return (
    <div className="absolute top-8 bg-sky-800 w-full max-w-xs m-2 px-4 py-2 rounded-md shadow-md z-40">
      <p className='block text-sm font-semibold border-b border-white/40 border-0.5 pb-1'>Searched Streamers</p>
      <div className='pb-2 flex flex-col divide-y devide-solid divide-white/40 gap-2'>
        {searchedStreamers.length > 0 && searchedStreamers.map((streamer) => (
            <div 
              className='pt-2'
              key={streamer._id + 'searchedStreamers'}
            >
              <Link 
                href={'/channel/home/'+streamer._id}
                className='w-full flex flex-row items-center flex-nowrap px-2 py-0.5 hover:bg-sky-950 rounded-md gap-2 font-semibold text-sm'
              >
                { streamer.profile ? 
                  <img src={streamer.profile} alt={streamer.nickname + ' profileSerch'} className='w-5 h-5 rounded-full'/>
                  :
                  <div
                    className='min-w-5 h-5 rounded-full flex justify-center items-center bg-sky-950'
                  >
                    <MdPerson className='w-3.5 h-3.5'/>
                  </div>
                } {streamer.nickname}
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
}
export default HeaderSearchPopUp;