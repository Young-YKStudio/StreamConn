import NoListCollarb from "./noList";
import CollarbListLinkBox from "./collarbListLinkBox";

const CollarbLeftList = ({list, selectedCollaraborationIndex, setSelectedCollaraborationIndex}) => {

  if(list) {
    
    let sortedList = list.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))

    return (
      <div className="w-60 h-full">
        {list.length > 0 ?
          <CollarbListLinkBox list={sortedList} selectedCollaraborationIndex={selectedCollaraborationIndex} setSelectedCollaraborationIndex={setSelectedCollaraborationIndex} />
          :
          <NoListCollarb />
        }
      </div>
    );
  }
}
export default CollarbLeftList;