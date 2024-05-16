import endpoint from "@/api_endpoint"
import axios from "axios"

export const _mark_message_as_read = async (payload, token) => {
    try {
        const headers = {
            "x-auth-tokens": token
        }
        const { data } = await axios.put(endpoint?.CHAT, payload, { headers })
        return data
    } catch (error) {
        return error
    }
}