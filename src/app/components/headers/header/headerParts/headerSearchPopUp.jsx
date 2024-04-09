import Link from 'next/link'

const HeaderSearchPopUp = ({searchedStreamers}) => {
  return (
    <div className="absolute top-8 bg-sky-800 w-full max-w-xs m-2 px-4 py-2 rounded-md shadow-md">
      <p className='block text-xs border-b border-white/40 border-0.5 pb-1'>Searched Streamers</p>
      <div className='pb-2 flex flex-col divide-y devide-solid divide-white/40 gap-2'>
        {searchedStreamers.length > 0 && searchedStreamers.map((streamer) => (
            <div className='pt-2'>
              <Link 
                href={'/channel/home/'+streamer._id}
                key={streamer._id + 'searchedStreamers'}
                className='w-full block px-2 py-0.5 hover:bg-sky-950 rounded-md'
              >
                {streamer.nickname}
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
}
export default HeaderSearchPopUp;