import { useState } from "react";
import { Box, Dialog, Typography } from "@mui/material";
import InputTextField from "@/components/form/field";
import { LuSend } from "react-icons/lu";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
import OTPInput from "@/components/otp/otp";
import axios from "axios";
import endpoint from "@/api_endpoint";
import Cookies from "js-cookie";
import ServiceVerifyApi from "@/service/verify_service";
const StepOne = ({ setStep, toastBox }) => {
    const [loader, setLoader] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [isOtpModal, setIsOtpModal] = useState(false)
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('')

    const formInit = {
        firstName: "",
        lastName: "",
        email: ""
    }

    const [formData, setFormData] = useState({ ...formInit })
    const Service = ServiceVerifyApi()
    // handle input change
    const handalChange = ({ target }) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // open OTP modal 
    const handalOpenOtpModel = async () => {
        try {
            const { firstName, lastName, email } = formData
            setLoader(true)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Hmm... That doesn't seem like a valid email address!")
            }
            if (!firstName || !lastName) {
                throw new Error("Hold up! Names can't be blank. Fill 'em in!");
            }
            const res = await axios.post(endpoint?.SEND_OTP_ON_EMIAL, formData)
            Cookies.set('_xvt', res?.data?.varifyToken)
            setSuccessMsg(res?.data?.message)
            setIsOtpModal(true)
        } catch (error) {
            toastBox({
                message: error?.response?.data?.error ? error?.response?.data?.error : error?.message,
                type: 'error',
                show: true,
            })
        } finally {
            setLoader(false)
        }
    }

    const chanageOTP = (value) => {
        setOtp(value)
        setOtpError("")
    }
    const verifyOtp = async () => {
        if (otp?.length < 5) {
            return setOtpError("Please enter a valid otp")
        } else {
            try {
                const res = await Service.post(endpoint?.VERIFY_EMAIL_USING_OTP, { otp })
                toastBox({
                    message: res?.data?.message,
                    type: 'success',
                    show: true,
                })
                setIsOtpModal(false)
                setTimeout(() => {
                    setStep(2)
                }, 1000)
            } catch (error) {
                setOtpError(error?.response?.data?.error ? error?.response?.data?.error : error?.message)
            }
        }
    }

    return (
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Personal Details </div>
            <InputTextField name="firstName" value={formData?.firstName} onChange={handalChange} label="First Name" variant="standard" fullWidth className="py-2" />
            <InputTextField name="lastName" value={formData?.lastName} onChange={handalChange} label="Last Name" variant="standard" fullWidth className="py-2" />
            <InputTextField name="email" value={formData?.email} onChange={handalChange} label="Email" variant="standard" fullWidth className="py-2" />
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"Send OTP"} endIcon={<LuSend />} handalClick={!loader ? handalOpenOtpModel : () => { }} />
            </div>

            {/* OTP dialog Box */}
            <Dialog open={isOtpModal}>
                <Box sx={{ padding: '0px 10px' }}>
                    <div component="div" className="text_center form-heading mt-4" >Enter OTP</div>
                    <Typography sx={{ fontSize: 14, textAlign: 'center', marginBottom: '12px' }} color="text.secondary" gutterBottom>
                        {successMsg}
                    </Typography>
                    <div className="px-5 mb-4">
                        <OTPInput otp={otp} setOtp={chanageOTP} />
                        <div className="text-center mt-2 text-danger">{otpError ? otpError : ""}</div>
                        <div className="d-flex justify-content-center mt-2">
                            <SiderButton title="Verify OTP" handalClick={verifyOtp} />
                        </div>
                    </div>
                </Box>
            </Dialog>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </>
    )
}

export default StepOne
