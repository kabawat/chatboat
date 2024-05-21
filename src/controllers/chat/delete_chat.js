import endpoint from "@/api_endpoint"
import axios from "axios"

export const _delete_contact_chat = async (payload, token) => {
    try {
        const headers = {
            "x-auth-tokens": token
        }
        const { data } = await axios.delete(endpoint?.CHAT, { headers, data: payload })
        return data
    } catch (error) {
        return error
    }
}