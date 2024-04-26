const CollaboEvents = ({events, selectedCollaraborationIndex}) => {

  let foundEvent = events.foundChannel[selectedCollaraborationIndex]

  console.log(foundEvent, 'at right side')
  if(foundEvent){
    return (
      <div className="w-full p-4 flex flex-col gap-2">
        <p>Events</p>
        {foundEvent && foundEvent.collarborations.map((event) => (
          <div
            key={event._id + ' event render'}
          >
            <p>{event.eventName}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default CollaboEvents;