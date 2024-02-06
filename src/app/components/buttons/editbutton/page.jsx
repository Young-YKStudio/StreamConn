'use client'

const editHandler = async (e, id) => {
  console.log('Edit postID:', id)
}

const EditButton = (id) => {
  console.log(id)
  return (
    <div>
      <button className='rounded-md bg-blue-400 hover:bg-red-700' onClick={(e) => editHandler(e, id)}>Edit</button>
    </div>
  );
}
export default EditButton;