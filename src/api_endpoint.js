const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
const fetchBaseURL = () => {
    if (environment == "development") {
        return process.env.NEXT_PUBLIC_APP_LOCAL_API_URL
    }
}
const baseURL = fetchBaseURL()
const endpoint = {
    REGISTRATION_OTP: `${baseURL}/api/auth/login`,
}
export default endpoint
