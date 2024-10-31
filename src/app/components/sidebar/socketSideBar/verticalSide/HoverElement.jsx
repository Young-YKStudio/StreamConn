export const HoverElement = ({hoverElement}) => {

  const generalStyles = 'pl-4 p-2 bg-sky-400 rounded-r-md text-xs text-white text-nowrap z-50'

  if(hoverElement) {
    switch(hoverElement.type) {
      case 'search' :
        return <div className={generalStyles}>
          <p>Search</p>
        </div>

      case 'home' :
        return <div className={generalStyles}>
          <p>Home</p>
        </div>
      
      case 'browse' :
        return <div className={generalStyles}>
          <p>Browse</p>
        </div>

      case 'recommended' :
        return <div className={generalStyles + ' w-42'}>
          <p>Recommended Channels</p>
        </div>

      case 'streamer' :
        return <div className={generalStyles}>
          <div
            className='flex flex-col'
          >
            <div className='flex flex-row items-center gap-2'>
              <p className='text-sm font-bold'>{hoverElement.streamer.nickname}</p>
              <p className='text-nowrap'>{hoverElement.streamer.followers.length} followers</p>
            </div>
          </div>
          <div>
            <p>{hoverElement.streamer.introduction}</p>
            {/* TODO: on-going events number */}
          </div>
        </div> 

      case 'help' :
        return <div className={generalStyles}>
          <p>Help</p>
        </div>

      case 'login' :
        return <div className={generalStyles}>
          <p>login</p>
        </div>

      default:
        return null
    }
  }
}