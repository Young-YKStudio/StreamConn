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
  streamers: undefined,
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
  }
})

export const { 
  setIsLoadingTrue, 
  setIsLoadingFalse, 
  setAuthUserRedux, 
  setAuthUserReset,
} = slice.actions

export default slice.reducer