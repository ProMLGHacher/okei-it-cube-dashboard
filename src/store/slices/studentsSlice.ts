import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState, ThunkConfig } from '../store'
import { AxiosResponse } from 'axios'
import { Student } from '../../types/Student'

export interface StudentsState {
    value?: Student[],
    groupId?: string | undefined,
    isLoading: boolean,
    error?: undefined | string,
    saved: boolean
}

const initialState: StudentsState = {
    value: undefined,
    isLoading: false,
    saved: true
}

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        switchStudentPresention: (state, action: PayloadAction<number>) => {
            if (state.value) {
                const index = state.value.findIndex(item => item.id === action.payload)
                state.value[index].wasPresent = !state.value[index].wasPresent
                state.saved = false
            }
        },
        setStudentReason: (state, action: PayloadAction<{
            id: number,
            reason: string
        }>) => {
            if (state.value) {
                const index = state.value.findIndex(item => item.id === action.payload.id)
                state.value[index].reason = action.payload.reason
                state.saved = false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStudentsWithGropeIdThunk.fulfilled, (state, action) => {
            state.value = action.payload
            state.groupId = action.meta.arg
            state.isLoading = false
            state.saved = true
        })
        builder.addCase(getStudentsWithGropeIdThunk.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
        builder.addCase(getStudentsWithGropeIdThunk.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })

        builder.addCase(exludeStudentWithIdThunk.fulfilled, (state, action) => {
            if (!state.value) return
            if (action.payload.status !== 200) return

            const index = state.value?.findIndex(item => item.id === action.meta.arg)
            state.value[index].isExcluded = true
        })

        builder.addCase(createStatementThunk.fulfilled, (state, action) => {
            if (!state.value) return
            if (action.payload.status !== 200) return

            state.saved = true
        })
    },
})

export const getStudentsWithGropeIdThunk = createAsyncThunk<Student[], string, ThunkConfig<string>>(
    'getStudentsThunk',
    async (data, { extra }) => {
        const responce: AxiosResponse<Student[]> = await extra.api.get<Student[]>(`/subgroup/${data}/students`)

        responce.data.sort((a, b) => {
            if (a.fullname < b.fullname) {
                return -1;
            }
            if (a.fullname > b.fullname) {
                return 1;
            }
            return 0;
        })
        return responce.data
    }
)

export const exludeStudentWithIdThunk = createAsyncThunk<AxiosResponse, number, ThunkConfig<string>>(
    'exludeStudentWithIdThunk',
    async (data, { extra }) => {
        const responce = await extra.api.patch<string>(`/student/${data}`)
        return responce
    }
)

export const createStatementThunk = createAsyncThunk<AxiosResponse, undefined, ThunkConfig<undefined>>(
    'createStatementThunk',
    async (_data, { extra, getState, rejectWithValue }) => {
        if (!getState().students.value) rejectWithValue(undefined)
        const data = {
            "subgroupId": getState().students.groupId,
            "studentAbsenceRecords": getState().students.value?.map((item) => {
                if (!item.wasPresent) {
                    return {
                        "studentId": item.id,
                        "reason": item.reason ? item.reason : ''
                    }
                }
            }).filter((item) => {
                if (item) {
                    return true
                } else {
                    return false
                }
            })
        }

        console.log(JSON.stringify(data));
        

        const responce = await extra.api.post<string>(`/statement`, data)
        return responce
    }
)

export const { switchStudentPresention, setStudentReason } = studentsSlice.actions
export const selectStudents = (state: RootState) => state.students.value
export const selectStudentsError = (state: RootState) => state.students.error
export const selectStudentsLoading = (state: RootState) => state.students.isLoading
export const selectStudentsSaved = (state: RootState) => state.students.saved
export const selectStudentsGroup = (state: RootState) => state.students.groupId
export default studentsSlice.reducer

