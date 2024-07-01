import endpoint from "@/api_endpoint";
import axios from "axios";
import Cookies from "js-cookie";

function ServiceAuthApi() {
    const token = Cookies.get('_x_a_t')
    let headers = {
        'x-auth-tokens': token
    }
    const Service = axios.create({
        baseURL: endpoint.BASE_URL,
        timeout: 10000,
        headers
    });
    return Service;
}
export default ServiceAuthApi
