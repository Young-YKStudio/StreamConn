import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  auth: {
    userId: '',
    userData: {},
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const slice = createSlice({
  name: 'streamConnectRedux',
  initialState,
  reducers: {
    setIsLoadingTrue: (state) => {
      state.isLoading = true
    },
    setIsLoadingFalse: (state) => {
      state.isLoading = false
    },
    setIsErrorTrue: (state) => {
      state.isError = true
    },
    setIsErrorFalse: (state) => {
      state.isError = false
    }
  }
})

export const { setIsLoadingTrue, setIsLoadingFalse, setIsErrorTrue, setIsErrorFalse } = slice.actions

export default slice.reducer