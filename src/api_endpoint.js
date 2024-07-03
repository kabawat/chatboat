const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
const fetchBaseURL = () => {
    if (environment == "development") {
        return process.env.NEXT_PUBLIC_APP_LOCAL_API_URL
    }
    if (environment == "production") {
        return process.env.NEXT_PUBLIC_APP_PRODUCTION_API_URL
    }
}
const baseURL = fetchBaseURL()
const endpoint = {
    // auth endpoint 
    BASE_URL: baseURL,
    LOGIN: `${baseURL}/api/auth/login`,
    SEND_OTP_ON_EMIAL: `${baseURL}/api/auth/send-otp`,
    VERIFY_EMAIL_USING_OTP: `/api/auth/verify-email`,
    REGISTRATION: `/api/auth/registration`,
    FINISH_SIGNUP: `/api/auth/finish-signup`,

    // profile endpoint
    PROFILE: `/api/profile`,

    // users endpoint
    USER_LIST: `/api/user`,

    // contact endpoint
    CONTACT: `/api/contact/`,

    // chat 
    CHAT: `/api/chat/`,

    // message
    MESSAGE: `/api/message/`,

    // static 
    STATIC: `${baseURL}/api/static/`,

    //password 
    FORGOT_PASSWORD_OTP: `${baseURL}/api/password/send-otp`,
    VERIFY_OTP: `${baseURL}/api/password/verify-otp`,
    CHANGE_PASSWORD: `${baseURL}/api/password/change-password`
}
export default endpoint
