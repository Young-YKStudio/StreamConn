'use client'
import { useDispatch, useSelector } from "react-redux";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";
import { imageUploadService } from "@/redux/service/uploadService";
import { useState } from 'react'

const ChannelHomePage = ({foundUser}) => {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.redux.auth)

  const testButtonHandler = (e) => {
  }

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