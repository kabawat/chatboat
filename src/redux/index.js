import { configureStore } from '@reduxjs/toolkit'
import startMessageSclice from './slice/static'
import onlineUsersSlice from './slice/online-user'
import chatContactSlice from './slice/chat'
import userListSlice from './slice/user/userList'
import profileSlice from './slice/profile'
import current_user from './slice/user'
import socketSlice from './slice/socket'
import chatSlice from './slice/message'
import theme from './slice/theme'

const store = configureStore({
    reducer: {
        online_users: onlineUsersSlice,
        current_user: current_user,
        user_list: userListSlice,
        startMsg: startMessageSclice,
        contact: chatContactSlice,
        profile: profileSlice,
        socket: socketSlice,
        theme: theme,
        chat: chatSlice,
    },
})
export default store