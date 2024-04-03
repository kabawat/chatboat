'use client'
import SiderButton from "@/components/button/SiderButton";
import InputTextField from "@/components/form/field";
import { PageLoader } from "@/components/loader/pageLoader";
import OTPInput from "@/components/otp/otp";
import { Card, Dialog, DialogTitle, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { LuSend } from "react-icons/lu";
export default function ForgotPasswordPage() {
    const loader = false
    const [isOtpModal, setIsOtpModal] = useState(false)
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('')

    // open OTP modal 
    const handalOpenOtpModel = () => {
        setIsOtpModal(true)
    }

    // close OTP modal 
    const handalCloseOtpModal = () => {
        setIsOtpModal(false)
        setOtp('')
        setOtpError('')
    }

    return (
        <div className="just_center">
            <Card className="form_card">
                <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Forgot Password </div>
                <InputTextField label="Email" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
                <div className="d-flex justify-content-center mt-2">
                    <SiderButton title={"Send OTP"} endIcon={<LuSend />} handalClick={handalOpenOtpModel} />
                </div>
                <Link href="/login" className="text-decoration-none">
                    <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
                        Login Option
                    </Typography>
                </Link>
            </Card>


            {/* OTP dialog Box */}
            <Dialog onClose={handalCloseOtpModal} open={isOtpModal}>
                <DialogTitle className="text-center">Enter OTP</DialogTitle>
                <div className="px-5 mb-4">
                    <OTPInput otp={otp} setOtp={setOtp} />
                    <div className="text-center mt-2 text-danger">{otpError ? otpError : ""}</div>
                    <div className="d-flex justify-content-center mt-2">
                        <SiderButton title="Verify OTP" handalClick={handalOpenOtpModel} />
                    </div>
                </div>
            </Dialog>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </div>
    );
}
