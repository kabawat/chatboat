import { createSlice } from '@reduxjs/toolkit'
const profileHandal = createSlice({
    name: "profileHandal",
    initialState: {
        _id: '9w84034324',
        firstName: "Mukesh",
        lastName: "Singh",
        email: "mukesh@singh.com",
        about: "Full Stack Developer",
        profile: "",
        status: true
    },
    reducers: {
        handalProfileHandal(state, action) {
            return {
                ...action.payload,
                status: true
            };
        }
    }
})
const profile = profileHandal.reducer
const { handalProfileHandal } = profileHandal.actions
export { handalProfileHandal }
export default profile