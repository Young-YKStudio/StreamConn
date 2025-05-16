import { createSlice } from '@reduxjs/toolkit'

// redux state -- immutable object
const initialState = {
  auth: undefined,
  isAuthStored: false,
  isLoading: false,
  allStreamers: [],
  newReleasedGames: [],
  forceAuthUpdate: false,
  IGDB_Token: undefined,
  logInCallback: undefined,
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
    setNewReleasedGames: (state, action) => {
      state.newReleasedGames = action.payload
    },
    setLogInCallback: (state, action) => {
      state.logInCallback = action.payload
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
    },
    setForceAuthUpdate: (state) => {
      state.forceAuthUpdate = !state.forceAuthUpdate
    },
    setIGDBTokenRedux: (state, action) => {
      state.IGDB_Token = action.payload
    },
  }
  })

export const { 
  setIsLoadingTrue, 
  setIsLoadingFalse, 
  setAuthUserRedux, 
  setAuthUserReset,
  setInitialAllStreamersUpdate,
  setAllStreamersUpdate,
  setForceAuthUpdate,
  setIGDBTokenRedux,
  setLogInCallback,
  setNewReleasedGames,
} = slice.actions

export default slice.reducer