import { createSlice } from '@reduxjs/toolkit'
const themeType = createSlice({
    name: "theme",
    initialState: typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : 'light', // light, dark
    reducers: {
        changeTheme(state, action) {
            const newState = action.payload
            localStorage.setItem('theme', newState);
            return newState;
        }
    }
})
const theme = themeType.reducer
const { changeTheme } = themeType.actions
export { changeTheme }
export default theme