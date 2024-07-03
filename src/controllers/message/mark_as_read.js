import endpoint from "@/api_endpoint"
import ServiceAuthApi from '@/service/auth_service'
const Service = ServiceAuthApi()
export const _mark_message_as_read = async (payload) => {
    try {
        const { data } = await Service.put(endpoint?.MESSAGE, payload)
        return data
    } catch (error) {
        return error
    }
}