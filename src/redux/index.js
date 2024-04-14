import { configureStore } from '@reduxjs/toolkit'
import theme from './slice/theme'
import current_user from './slice/user'
import profileSlice from './slice/profile'

const store = configureStore({
    reducer: {
        theme: theme,
        profile: profileSlice,
        current_user: current_user,
    },
})
export default store