import endpoint from "@/api_endpoint"
import axios from "axios"

export const _add_new_contact = async (payload, token) => {
    try {
        const headers = {
            "x-auth-tokens": token
        }
        // create new contact
        const { data } = await axios.post(endpoint?.CONTACT, payload, { headers })
        return data
    } catch (error) {
        return error
    }
}