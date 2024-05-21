import endpoint from "@/api_endpoint";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const get_contact_list = createAsyncThunk('contact_list', async ({ token }, { rejectWithValue }) => {
    try {
        let headers = {
            'x-auth-tokens': token
        }
        const { data } = await axios.get(endpoint.CHAT, { headers })
        return data
    } catch (error) {
        return rejectWithValue(error.response)
    }
})

const chat_contact = createSlice({
    name: "chat_contact",
    initialState: {
        loading: false,
        error: null,
        data: [],
        status: false,
    },
    extraReducers: (building) => {
        building.addCase(get_contact_list.pending, (state, action) => {
            state.loading = true;
        })
        building.addCase(get_contact_list.fulfilled, (state, { payload }) => {
            const { data } = payload
            state.data = data;
            state.status = true
            state.loading = false
        })
        building.addCase(get_contact_list.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.data = null;
        })
    },
    reducers: {
        udpate_contact_list(state, { payload }) {
            const updatedData = []
            state.data.map((it) => {
                if (it?.chat_id == payload.chat_id) {
                    updatedData.unshift({ ...it, last_chat: payload })
                } else {
                    updatedData.push(it)
                }
            })
            state.data = updatedData
        },

        // add new contact 
        add_new_contact(state, { payload }) {
            state.data.unshift(payload)
        },

        // clear chat 
        clear_chat_message(state, { payload }) {
            state.data = state.data.map(item => {
                if (item?.chat_id == payload.chat_id) {
                    return {
                        ...item,
                        last_chat: {}
                    }
                }
                return item
            })
        }
    }
})

const chatContactSlice = chat_contact.reducer
export const { udpate_contact_list, add_new_contact, clear_chat_message } = chat_contact.actions
export default chatContactSlice