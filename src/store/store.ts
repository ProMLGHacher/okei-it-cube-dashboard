import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import { $api } from '../shared/api/api'
import { AxiosInstance } from 'axios'
import groupsSlice from './slices/groupsSlice'
import studentsSlice from './slices/studentsSlice'

export interface ThunkExtraArgs {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T, 
    extra: ThunkExtraArgs,
    state: RootState
}

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    groups: groupsSlice,
    students: studentsSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
        extraArgument: {
            api: $api
        }
    },
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch