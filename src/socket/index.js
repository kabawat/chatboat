import endpoint from '@/api_endpoint'
import io from 'socket.io-client'
// const url = 'http://localhost:2917'
// socket  handler 
const socket = io(endpoint.BASE_URL)
export default socket