import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import axios from 'axios'
// import socket from "@/socket";
export const get_profile = createAsyncThunk("get_profile", async ({ token }, { rejectWithValue }) => {
    try {
        let headers = {
            'x-auth-tokens': token
        }
        const { data } = await axios.get(endpoint.PROFILE, { headers })
        return data
    } catch (error) {
        console.log('error : ', error)
        return rejectWithValue(error.response)
    }
})

const profile = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        error: null,
        data: null,
        status: false,
    },
    extraReducers: (builder) => {
        builder.addCase(get_profile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_profile.fulfilled, (state, { payload }) => {
            const { data } = payload
            // socket.emit('login', { username: data?.username, _id: data?._id })
            state.data = data;
            state.status = true
            state.loading = false
        });
        builder.addCase(get_profile.rejected, (state, action) => {
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

const profileSlice = profile.reducer
export default profileSlice

export const { update } = profile.actions