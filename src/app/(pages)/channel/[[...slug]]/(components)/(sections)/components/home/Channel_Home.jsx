'use client'
import { useDispatch, useSelector } from "react-redux";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";
import { imageUploadService } from "@/redux/service/uploadService";
import { useState, useEffect } from 'react'
import { sendTestEmail } from '@/redux/service/authService'

const ChannelHomePage = ({foundUser}) => {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.redux.auth)

  const [ uploadQueue, SetUploadQueue ] = useState([])
  const [ mutatedData, setMutatedData ] = useState([])

  let initialData = [
    {id: 'fist id', name: '1', number: 1},
    {id: 'second id', name: '2', number: 2},
    {id: 'third id', name: '23', number: 3},
  ]

  const testButtonHandler = async (e) => {

    
    let mutatedData = []
    
    initialData.forEach(data => {
      let desiredDataFormat = {
        id: data.id,
        name: data.name
      }
      mutatedData.push(desiredDataFormat)
    })

    console.log(mutatedData, 'success?')

  }

  useEffect(() => {

    let addingAttributes = (data) => {
      let receivedData = data //array
      receivedData.forEach(async (individualObject, index) => {
        individualObject.name = `${index + 1}`
      })

      return receivedData
    }


    return () => {
      setMutatedData(addingAttributes(initialData))
    }

  },[])

  return (
    <div>
      <p> Channel Home </p>
      <button
        onClick={testButtonHandler}
        className="px-3 py-2 bg-sky-500 text-center hover:bg-sky-800">test button</button>
      <UploadButton 
        endpoint='imageUploader'
        onClientUploadComplete={async (res) => {
          let serverRes = await imageUploadService(res, loggedUser)
          if(serverRes) {
            console.log(serverRes, 'final response')
          }
        }}
        onUploadError={(error) => {
          toast.error(error)
        }}
        onUploadSuccess={(res) => {

          console.log(res, 'res from upload success')
        }}
      />
      <UploadDropzone 
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onDrop={(acceptedFiles) => {
          // Do something with the accepted files
          console.log("Accepted files: ", acceptedFiles);
        }}
      />
    </div>
  );
}
export default ChannelHomePage;