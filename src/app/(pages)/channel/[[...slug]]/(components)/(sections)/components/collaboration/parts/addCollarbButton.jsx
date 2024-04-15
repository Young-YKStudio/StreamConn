const AddCollarbButton = ({isEventAddModal, setIsEventAddModal}) => {

  const buttonHandler = (e) => {
    // set up modal
    setIsEventAddModal(!isEventAddModal)
  }

  const styleDistributor = (state) => {
    let baseStyle = 'rounded-md px-4 py-2 w-full truncate'
    if(state) {
      return `${baseStyle} bg-sky-800`
    }
    return `${baseStyle} bg-sky-950 hover:bg-sky-800`
  } 

  return (
    <button 
      className={styleDistributor(isEventAddModal)}
      onClick={buttonHandler}
    >
      Start Collarboration Event
    </button>
  );
}
export default AddCollarbButton;