import endpoint from "@/api_endpoint"
import ServiceAuthApi from '@/service/auth_service'
const Service = ServiceAuthApi()

// create new contact
export const _add_new_chat = async (payload) => {
    try {
        const { data } = await Service.post(endpoint?.CONTACT, payload)
        return data
    } catch (error) {
        return error
    }
}

// block user rest API
export const _block_user_contact = async (payload) => {
    try {
        await Service.post(endpoint.CONTACT + "/block", payload)
    } catch (error) {
        console.log("error : ", error)
    }
}