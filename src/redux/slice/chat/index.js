import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoint from "@/api_endpoint";
import axios from 'axios'
export const get_chat = createAsyncThunk("get_chat", async ({ token, chat_id }, { rejectWithValue }) => {
    try {
        let headers = { 'x-auth-tokens': token }
        const { data } = await axios.post(endpoint.CHAT, { chat_id: chat_id }, { headers })
        return data
    } catch (error) {
        console.log('error : ', error)
        return rejectWithValue(error.response)
    }
})

const chat = createSlice({
    name: "chat",
    initialState: {
        loading: false,
        error: null,
        data: [],
        status: true,
    },
    extraReducers: (builder) => {
        builder.addCase(get_chat.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(get_chat.fulfilled, (state, { payload }) => {
            const { data } = payload
            state.data = data;
            state.status = true
            state.loading = false
        });
        builder.addCase(get_chat.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        });
    },
    reducers: {
        add_new_chat(state, action) {
            const data = {
                time: new Date(),
                ...action.payload
            }
            const new_data = [...state.data, data]
            state.data = new_data
            return state
        }
    }
})

const chatSlice = chat.reducer
export default chatSlice

export const { add_new_chat } = chat.actions