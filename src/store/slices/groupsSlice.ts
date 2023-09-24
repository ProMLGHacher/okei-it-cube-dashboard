import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState, ThunkConfig } from '../store'
import { Groupe as Group } from '../../types/Group'
import { AxiosResponse } from 'axios'

export interface GroupsState {
    value?: Group[],
    isLoading: boolean,
    error?: undefined | string
}

const initialState: GroupsState = {
    value: undefined,
    isLoading: true
}

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGroupsThunk.fulfilled, (state, action) => {
            state.value = action.payload
            state.isLoading = false
        })
        builder.addCase(getGroupsThunk.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
        builder.addCase(getGroupsThunk.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
    },
})

export const getGroupsThunk = createAsyncThunk<Group[], undefined, ThunkConfig<string>>(
    'getGroupsThunk',
    async (_data, { extra }) => {
        const responce: AxiosResponse<Group[]> = await extra.api.get<Group[]>('/subgroups')
        return  responce.data
    }
)

// export const {  } = groupsSlice.actions
export const selectGroups = (state: RootState) => state.groups.value
export const selectGroupsError = (state: RootState) => state.groups.error
export const selectGroupsLoading = (state: RootState) => state.groups.isLoading
export default groupsSlice.reducer

