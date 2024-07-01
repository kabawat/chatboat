import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import ServiceAuthApi from '@/service/auth_service'
const Service = ServiceAuthApi()
export const get_userList = createAsyncThunk("get_userList", async ({ query }, { rejectWithValue }) => {
    try {
        const { data } = await Service.get(`${endpoint.USER_LIST}?search=${query ? query : ''}`);

        return data
    } catch (error) {
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