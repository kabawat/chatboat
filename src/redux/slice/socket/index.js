// import endpoint from '@/api_endpoint'
// import { createSlice } from '@reduxjs/toolkit'
// import io from 'socket.io-client'
// const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
// const fetchBaseURL = () => {
//     if (environment == "development") {
//         return process.env.NEXT_PUBLIC_APP_LOCAL_SOCKET_URL
//     }
//     if (environment == "production") {
//         return process.env.NEXT_PUBLIC_APP_PRODUCTION_SOCKET_URL
//     }
// }
// const baseURL = fetchBaseURL()
// // const socketIO = io('https://chatboat-socket.vercel.app')
// // const socketIO = io('https://chatboat-socket.onrender.com')
// const socketIO = io(baseURL)
// const socket_connection = createSlice({
//     name: "Socket",
//     initialState: {
//         socket: socketIO
//     },
//     reducers: {
//         changeSocket(state, { payload }) {
//             state.socket = payload
//         }
//     }
// })
// const socketSlice = socket_connection.reducer
// export const { changeSocket } = socket_connection.actions
// export default socketSlice