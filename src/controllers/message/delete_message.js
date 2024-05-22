import endpoint from "@/api_endpoint"
import axios from "axios"

export const _delete_messages_controller = async (payload, token) => {
    try {
        const headers = {
            "x-auth-tokens": token
        }
        const { data } = await axios.delete(endpoint?.MESSAGE, { headers, data: payload })
        return data
    } catch (error) {
        return error
    }
}