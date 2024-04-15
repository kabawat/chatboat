import endpoint from '@/api_endpoint'
import { createSlice } from '@reduxjs/toolkit'
import io from 'socket.io-client'
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
const fetchBaseURL = () => {
    if (environment == "development") {
        return process.env.NEXT_PUBLIC_APP_LOCAL_API_URL
    }
    if (environment == "production") {
        return process.env.NEXT_PUBLIC_APP_PRODUCTION_API_URL
    }
}
const baseURL = fetchBaseURL()
const socketIO = io(baseURL)
const socket_connection = createSlice({
    name: "Socket",
    initialState: {
        socket: socketIO
    },
})
const socketSlice = socket_connection.reducer
export default socketSlice