const { default: endpoint } = require("@/api_endpoint");
const { default: axios } = require("axios");

export async function _forgot_password_otp(payload) {
    try {
        const response = await axios.post(endpoint?.FORGOT_PASSWORD_OTP, payload)
        return {
            data: response?.data,
            status: true
        }
    } catch (error) {
        return error?.response?.data
    }
}

export async function _verify_otp(payload, token) {
    try {
        const headers = {
            'x-access-tokens': token
        }
        const response = await axios.post(endpoint?.VERIFY_OTP, payload, { headers })
        return {
            data: response?.data,
            status: true
        }
    } catch (error) {
        return error?.response?.data
    }
}
export async function _change_password(payload, headers) {
    console.log("headers : ", headers)
    try {
        const response = await axios.put(endpoint?.CHANGE_PASSWORD, payload, { headers })
        return {
            data: response?.data,
            status: true
        }
    } catch (error) {
        return error?.response?.data
    }
}