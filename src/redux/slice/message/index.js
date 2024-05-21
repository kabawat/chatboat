import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import axios from 'axios'
export const get_chat_message = createAsyncThunk("get_chat_message", async ({ token, chat_id, page, clean = false }, { rejectWithValue }) => {
    try {
        let headers = { 'x-auth-tokens': token }
        const { data } = await axios.post(endpoint.MESSAGE, { chat_id: chat_id, page }, { headers })
        const mapping = { data, clean }
        return mapping
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

const chat = createSlice({
    name: "chat",
    initialState: {
        loading: false,
        error: null,
        status: true,
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(get_chat_message.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_chat_message.fulfilled, (state, { payload }) => {
            const { clean, data } = payload
            if (clean) {
                state.data = data?.data
            } else {
                state.data = [...data?.data, ...state.data]
            }
            state.page = data?.page
            state.totalMessages = data?.totalMessages
            state.totalPages = data?.totalPages
            state.status = true
            state.loading = false
        });
        builder.addCase(get_chat_message.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        add_new_message(state, action) {
            const data = {
                time: new Date(),
                ...action.payload
            }
            const new_data = [...state.data, data]
            state.data = new_data
            return state
        },
        
    }
})

const chatSlice = chat.reducer
export default chatSlice

export const { add_new_message } = chat.actions