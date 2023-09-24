import { createAsyncThunk } from "@reduxjs/toolkit";
import { CounterState, incrementByAmount } from "../slices/counterSlice";
import { ThunkConfig } from "../store";

interface ThunkProps {
    amount: number
}

export const testThunk = createAsyncThunk<CounterState, ThunkProps, ThunkConfig<string>>(
    'testThunk',
    async (data, { dispatch }) => {
        const dt: CounterState = {
            value: 12
        } 
        setTimeout(() => {
            dispatch(incrementByAmount(data.amount))
        }, 200)
        return dt
    }
)