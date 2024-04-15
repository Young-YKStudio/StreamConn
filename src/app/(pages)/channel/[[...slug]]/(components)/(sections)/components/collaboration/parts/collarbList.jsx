import NoListCollarb from "./noList";

const CollarbLeftList = ({list}) => {
  if(list) {
    return (
      <div className="w-60 h-full">
        {list.length > 0 ?
          <p>list available</p>
          :
          <NoListCollarb />
        }
      </div>
    );
  }
}
export default CollarbLeftList;