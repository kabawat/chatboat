import endpoint from '@/api_endpoint'
import io from 'socket.io-client'
const socket = io(endpoint.BASE_URL)
console.log("endpoint.BASE_URL socket/ : ", endpoint.BASE_URL)
console.log("socket.id socket/ : ", socket.id)
export default socket