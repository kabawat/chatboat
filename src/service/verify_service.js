import endpoint from "@/api_endpoint";
import axios from "axios";
import Cookies from "js-cookie";

function ServiceVerifyApi() {

    const token = Cookies.get('_xvt')
    const headers = {
        "x-verification-tokens": token
    }
    const Service = axios.create({
        baseURL: endpoint.BASE_URL,
        timeout: 10000,
        headers
    });
    return Service;
}
export default ServiceVerifyApi
