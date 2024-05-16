const { createSlice } = require("@reduxjs/toolkit");

const online = createSlice({
    name: "online",
    initialState: [],
    reducers: {
        setOnlineUsers(state, { payload }) {
            return payload.data
        }
    }
})

const onlineUsersSlice = online.reducer
export const { setOnlineUsers } = online.actions
export default onlineUsersSlice