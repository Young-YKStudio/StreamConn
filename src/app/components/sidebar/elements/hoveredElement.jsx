import { ImageDistributor, NumberFormatter } from "./sharedFunctions"

const HoveredElement = ({streamer}) => {
  return (
    <>
      <p className="text-lg font-bold">{streamer.nickname}</p>
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