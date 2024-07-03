import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    _id: '',
    last_seen: "",
    profile: '',
    last_chat: "",
    notification: '',
    status: false,
    about: "",
    contact_id: "",
    email: "",
    firstName: "",
    lastName: "",
    user_id: "",
    is_block: false,
    blocked_by: []
}
const CurrentUser = createSlice({
    name: "CurrentUser",
    initialState: initialState,
    reducers: {
        handalCurrentUser(state, action) {
            if (action.payload == null) {
                return initialState
            }
            return {
                ...action.payload,
                status: true
            };
        },
        update_last_chat(state, { payload }) {
            state.last_chat = payload
            return state
        },
        update_current_user(state, { payload }) {
            return payload
        }
    }

})
const current_user = CurrentUser.reducer
export const { handalCurrentUser, update_last_chat, update_current_user } = CurrentUser.actions
export default current_user