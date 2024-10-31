import NoListCollarb from "./noList";
import CollarbListLinkBox from "./collarbListLinkBox";

const CollarbLeftList = ({list, selectedCollaraborationIndex, setSelectedCollaraborationIndex, isEventAddModal, setIsEventAddModal, addCollaborationChannel, setAddCollaborationChannel}) => {

  if(list) {
    
    let sortedList = list.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))

    return (
      <div className="w-[200px] h-full">
        {list.length > 0 ?
          <CollarbListLinkBox 
            list={sortedList} 
            selectedCollaraborationIndex={selectedCollaraborationIndex} setSelectedCollaraborationIndex={setSelectedCollaraborationIndex} 
            isEventAddModal={isEventAddModal} 
            setIsEventAddModal={setIsEventAddModal}
            addCollaborationChannel={addCollaborationChannel}
            setAddCollaborationChannel={setAddCollaborationChannel}
          />
          :
          <NoListCollarb />
        }
      </div>
    );
  }
}
export default CollarbLeftList;