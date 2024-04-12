import { createSlice } from '@reduxjs/toolkit'
const themeType = createSlice({
    name: "theme",
    initialState: 'light', // light, dark
    reducers: {
        changeTheme(state, action) {
            const newState = action.payload
            return newState;
        }
    }
})
const theme = themeType.reducer
const { changeTheme } = themeType.actions
export { changeTheme }
export default theme