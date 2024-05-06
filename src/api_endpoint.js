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
    SEND_OTP_ON_EMIAL: `${baseURL}/api/auth/send-otp`,
    VERIFY_EMAIL_USING_OTP: `${baseURL}/api/auth/verify-email`,
    REGISTRATION: `${baseURL}/api/auth/registration`,
    FINISH_SIGNUP: `${baseURL}/api/auth/finish-signup`,
    LOGIN: `${baseURL}/api/auth/login`,

    // profile endpoint
    PROFILE: `${baseURL}/api/profile`,

    //    users endpoint
    USER_LIST: `${baseURL}/api/user`,

    //    contact endpoint
    CONTACT: `${baseURL}/api/contact/`,
}
export default endpoint
