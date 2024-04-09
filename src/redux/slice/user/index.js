import { createSlice } from '@reduxjs/toolkit'
const CurrentUser = createSlice({
    name: "CurrentUser",
    initialState: {
        _id: '',
        name: "",
        last_seen: "",
        profile: '',
        lastMsg: "",
        notification: '',
        status: false
    },
    reducers: {
        handalCurrentUser(state, action) {
            return {
                ...action.payload,
                status: true
            };
        }
    }
})
const current_user = CurrentUser.reducer
const { handalCurrentUser } = CurrentUser.actions
export { handalCurrentUser }
export default current_user