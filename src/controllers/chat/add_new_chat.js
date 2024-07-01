import endpoint from "@/api_endpoint"
import ServiceAuthApi from '@/service/auth_service'
const Service = ServiceAuthApi()
export const _add_new_chat = async (payload) => {
    try {
        // create new contact
        const { data } = await Service.post(endpoint?.CONTACT, payload)
        return data
    } catch (error) {
        return error
    }
}