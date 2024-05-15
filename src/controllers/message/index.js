import endpoint from "@/api_endpoint"
import axios from "axios"

export const add_new_contact = async (contact_id, token) => {
    try {
        const headers = {
            "x-auth-tokens": token
        }
        // create new contact
        const { data } = await axios.post(endpoint?.CONTACT, { contact: contact_id }, { headers })
        return data
    } catch (error) {
        return error
    }
}