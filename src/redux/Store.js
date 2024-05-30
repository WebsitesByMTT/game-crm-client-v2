import { configureStore } from '@reduxjs/toolkit'
import { reduxSlice } from './ReduxSlice'

export const store = configureStore({
  reducer: {
    name:'globlestate',
    globlestate:reduxSlice.reducer
  },
})