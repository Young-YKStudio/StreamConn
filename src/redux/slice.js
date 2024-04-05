import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { signOut, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import axios from 'axios'

// redux state -- immutable object
const initialState = {
  auth: undefined,
  isAuthStored: false,
  isLoading: false,
  allStreamers: [],
}

// slice
export const slice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    // loading status
    setIsLoadingTrue: (state) => {
      state.isLoading = true
    },
    setIsLoadingFalse: (state) => {
      state.isLoading = false
    },
    // Authentication
    setAuthUserRedux: (state, action) => {
      state.auth = action.payload
      state.isAuthStored = true
    },
    setAuthUserReset: (state) => {
      state.auth = undefined
      state.isAuthStored = false
    },
    setInitialAllStreamersUpdate: (state, action) => {
      state.allStreamers = action.payload
    },
    setAllStreamersUpdate: (state, action) => {
      state.allStreamers.map((reduxStreamer) => {
        action.payload.forEach(receivedStreamer => {
          if(reduxStreamer._id === receivedStreamer._id) {
            return reduxStreamer
          }
          return {
            ...reduxStreamer,
            receivedStreamer
          }
        })
      })
    }}
  })

export const { 
  setIsLoadingTrue, 
  setIsLoadingFalse, 
  setAuthUserRedux, 
  setAuthUserReset,
  setInitialAllStreamersUpdate,
  setAllStreamersUpdate,
} = slice.actions

export default slice.reducer