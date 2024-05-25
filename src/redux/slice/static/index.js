import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import axios from 'axios'
export const getStartMessage = createAsyncThunk("getStartMessage", async ({ token }, { rejectWithValue }) => {

    try {
        let headers = { 'x-auth-tokens': token }
        const { data } = await axios.get(endpoint.STATIC, { headers })
        return data
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

const chat = createSlice({
    name: "StartMessage",
    initialState: {
        loading: false,
        error: null,
        status: false,
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getStartMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getStartMessage.fulfilled, (state, { payload }) => {

            const { message } = payload
            state.data = message
            state.status = true
            state.loading = false
        });
        builder.addCase(getStartMessage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
})

const startMessageSclice = chat.reducer
export default startMessageSclice