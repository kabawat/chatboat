import endpoint from "@/api_endpoint"
import ServiceAuthApi from '@/service/auth_service'
const Service = ServiceAuthApi()
export const _delete_messages_controller = async (payload) => {
    try {
        const { data } = await Service.delete(endpoint?.MESSAGE, { data: payload })
        return data
    } catch (error) {
        return error
    }
}