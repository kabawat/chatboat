import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import ServiceAuthApi from '@/service/auth_service'
const Service = ServiceAuthApi()
export const get_profile = createAsyncThunk("get_profile", async (_, { rejectWithValue }) => {
    try {
        const { data } = await Service.get(endpoint.PROFILE)
        return data
    } catch (error) {
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