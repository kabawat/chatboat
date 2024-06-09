'use client'
import ToastSnackbar from "@/components/Snackbar";
import SiderButton from "@/components/button/SiderButton";
import InputTextField from "@/components/form/field";
import { PageLoader } from "@/components/loader/pageLoader";
import OTPInput from "@/components/otp/otp";
import { _forgot_password_otp, _verify_otp } from "@/controllers/password/password_reset";
import { Card, Dialog, DialogTitle, Typography } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";
const toastInit = {
    show: false,
    message: "",
    type: "",
    duration: 5000,
    vertical: "top",
    horizontal: 'center'
}
export default function SendOtpSection({ setChange }) {
    const token = Cookies.get('')
    const [isOtpModal, setIsOtpModal] = useState(false)
    const [otpError, setOtpError] = useState('')
    const [loader, setLoader] = useState(false)
    const [Toast, setToast] = useState(toastInit)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState('');

    useEffect(() => {
        setOtpError('')
    }, [otp])
    const handleChange = ({ target }) => {
        setEmail(target.value)
    }
    // close OTP modal 
    const handalCloseOtpModal = () => {
        setIsOtpModal(false)
        setOtp('')
        setOtpError('')
    }

    // send otp 
    const getSendOtp = async () => {
        setLoader(true)
        const res = await _forgot_password_otp({ email })
        if (res.status) {
            setIsOtpModal(true)
            const tenMinutesFromNow = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('_x_p_a_t', res.data.access_token, { expires: tenMinutesFromNow })
            setToast({
                ...Toast,
                message: res?.data?.message,
                type: 'success',
                show: true,
            })
        } else {
            setToast({
                ...Toast,
                message: res?.message,
                type: 'error',
                show: true,
            })
            setTimeout(() => {
                setToast(toastInit)
            }, 4000)
        }
        setLoader(false)
    }

    // verify otp 
    const verifyOtp = async () => {
        if (otp.length === 5) {
            const token = Cookies.get('_x_p_a_t')
            const res = await _verify_otp({ otp, email }, token)
            if (res?.status) {
                const tenMinutesFromNow = new Date(new Date().getTime() + 10 * 60 * 1000);
                Cookies.set('_x_p_a_t', res.data.access_token, { expires: tenMinutesFromNow })
                setChange(true)
            } else {
                setOtpError('Please enter valid OTP')
                setTimeout(() => {
                    setOtpError('')
                }, 4000)
            }
        } else {
            setOtpError('Please enter valid OTP')
        }
    }

    // handle change password 


    return (
        <div className="just_center">
            <Card className="form_card">
                <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Forgot Password </div>
                <InputTextField name="email" value={email} onChange={handleChange} type="text" label="Email" variant="standard" id="outlined-size-small" fullWidth sx={{ margin: '10px 0px' }} />
                <div className="d-flex justify-content-center mt-2">
                    <SiderButton title={"Send OTP"} endIcon={<LuSend />} handalClick={getSendOtp} />
                </div>
                <Link href="/login" className="text-decoration-none">
                    <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
                        Login Option
                    </Typography>
                </Link>
            </Card>


            {/* OTP dialog Box */}
            <Dialog open={isOtpModal}>
                <DialogTitle className="text-center">Enter OTP</DialogTitle>
                <div className="px-5 mb-4">
                    <OTPInput otp={otp} setOtp={setOtp} />
                    <div className="text-center mt-2 text-danger text-wrap">{otpError ? otpError : ""}</div>
                    <div className="d-flex justify-content-center mt-2">
                        <SiderButton title="Verify OTP" handalClick={verifyOtp} />
                    </div>
                </div>
            </Dialog>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
            {Toast?.show ? <ToastSnackbar handalClose={() => setToast(toastInit)} data={Toast} /> : <></>}
        </div>
    );
}