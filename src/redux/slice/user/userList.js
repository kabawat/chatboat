import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import axios from 'axios'
import socket from "@/socket";
export const get_userList = createAsyncThunk("get_userList", async ({ token }, { rejectWithValue }) => {
    try {
        let headers = {
            'x-auth-tokens': token
        }
        const { data } = await axios.get(endpoint.USER_LIST, { headers })
        return data
    } catch (error) {
        console.log('error : ', error)
        return rejectWithValue(error.response)
    }
})

const userList = createSlice({
    name: "userList",
    initialState: {
        loading: false,
        error: null,
        data: null,
        status: false,
    },
    extraReducers: (builder) => {
        builder.addCase(get_userList.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_userList.fulfilled, (state, { payload }) => {
            const { data } = payload
            state.data = data;
            state.status = true
            state.loading = false
        });
        builder.addCase(get_userList.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        update(state, action) {
            return action.payload
        }
    }
})

const userListSlice = userList.reducer
export default userListSlice

export const { update } = userList.actions