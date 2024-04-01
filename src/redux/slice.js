import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

// redux state
const initialState = {
  auth: {
    userId: '',
    userData: {},
  },
  isLoading: false,
}

// slice
export const slice = createSlice({
  name: 'streamConnectRedux',
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
    setAuthWithOAuth: (state, action) => {
      console.log(state, 'state', action, 'action', 'from redux reducer')
      toast(action.payload.sample1)
    },
    logOut: async (state, action) => {
      await signOut()
      redirect('/')
    }
  }
})

export const { setIsLoadingTrue, setIsLoadingFalse, setAuthWithOAuth, logOut } = slice.actions

export default slice.reducer