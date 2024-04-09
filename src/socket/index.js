import io from 'socket.io-client'
const url = 'http://localhost:2917'
// socket  handler 
const socket = io(url)
export default socket