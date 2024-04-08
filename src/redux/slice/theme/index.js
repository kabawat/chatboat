import { createSlice } from '@reduxjs/toolkit'
const initialState = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
const themeType = createSlice({
    name: "theme",
    initialState: initialState, // light, dark
    reducers: {
        changeTheme(state) {
            const newState = state === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newState);
            return newState;
        }
    }
})
const theme = themeType.reducer
const { changeTheme } = themeType.actions
export { changeTheme }
export default theme