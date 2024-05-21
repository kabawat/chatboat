import { configureStore } from '@reduxjs/toolkit'
import theme from './slice/theme'
import current_user from './slice/user'
import profileSlice from './slice/profile'
import userListSlice from './slice/user/userList'
import socketSlice from './slice/socket'
import chatSlice from './slice/message'
import onlineUsersSlice from './slice/online-user'
import chatContactSlice from './slice/chat'

const store = configureStore({
    reducer: {
        theme: theme,
        profile: profileSlice,
        current_user: current_user,
        user_list: userListSlice,
        socket: socketSlice,
        chat: chatSlice,
        online_users: onlineUsersSlice,
        contact: chatContactSlice
    },
})
export default store