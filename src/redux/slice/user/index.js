import { createSlice } from '@reduxjs/toolkit'
const CurrentUser = createSlice({
    name: "CurrentUser",
    initialState: {},
    reducers: {
        handalCurrentUser(state, action) {
            return action.payload;
        }
    }
})
const current_user = CurrentUser.reducer
const { handalCurrentUser } = CurrentUser.actions
export { handalCurrentUser }
export default current_user