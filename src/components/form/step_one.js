import { useState } from "react";
import { CheckBoxACheck } from "@/components/comman/checkBox";
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import InputTextField from "@/components/form/field";
import { LuSend } from "react-icons/lu";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
import OTPInput from "@/components/otp/otp";
const StepOne = () => {
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
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Personal Details </div>
            <InputTextField label="First Name" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px', }} />
            <InputTextField label="Last Name" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
            <InputTextField label="Email" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"Send OTP"} endIcon={<LuSend />} handalClick={handalOpenOtpModel} />
            </div>

            {/* OTP dialog Box */}
            <Dialog onClose={handalCloseOtpModal} open={isOtpModal}>
                <Box sx={{ padding: '0px 10px' }}>
                    <div component="div" className="text_center form-heading mt-4" >Enter OTP</div>
                    <Typography sx={{ fontSize: 14, textAlign: 'center', marginBottom: '12px' }} color="text.secondary" gutterBottom>
                        We have sent a verification code to your email id
                    </Typography>
                    <div className="px-5 mb-4">
                        <OTPInput otp={otp} setOtp={setOtp} />
                        <div className="text-center mt-2 text-danger">{otpError ? otpError : ""}</div>
                        <div className="d-flex justify-content-center mt-2">
                            <SiderButton title="Verify OTP" handalClick={handalOpenOtpModel} />
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
