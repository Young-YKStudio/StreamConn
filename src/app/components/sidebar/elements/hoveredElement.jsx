import { ImageDistributor, NumberFormatter } from "./sharedFunctions"
import { MdPerson } from 'react-icons/md'

const HoveredElement = ({streamer}) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        {streamer.profile ?
          <img src={streamer.profile} alt={streamer.nickname + ' profile'} className="w-8 h-8 rounded-full"/>
          :
          <div className="min-w-8 h-8 rounded-full flex justify-center items-center bg-sky-950">
            <MdPerson className='w-5 h-5'/>
          </div>
        }
        <p className="text-lg font-bold">{streamer.nickname}</p>
      </div>
      <p className="truncate py-1">{streamer.introduction}</p>
      <div className="flex flex-row flex-nowrap gap-1.5 items-center justify-between">
        <p className="text-xs text-slate-300">{NumberFormatter(streamer.follows.length)} follows</p>
        <div className="flex flex-row flex-nowrap gap-1.5 items-center">
          {streamer && streamer.platforms.map((platform) => (
            <div
              key={platform._id + ' hoveredSection'}
            >
              {ImageDistributor(platform)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default HoveredElement;