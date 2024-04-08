import { configureStore } from '@reduxjs/toolkit'
import theme from './slice/theme'
import current_user from './slice/user'

const store = configureStore({
    reducer: {
        theme: theme,
        current_user: current_user
    },
})
export default store