'use client'
import SiderButton from "@/components/button/SiderButton";
import InputTextField from "@/components/form/field";
import OTPInput from "@/components/otp/otp";
import { Card, Dialog, DialogTitle, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { LuSend } from "react-icons/lu";
export default function BasicGrid() {
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
      <Card sx={{ padding: '30px 40px' }} className="form_card">
        <Typography variant="h5" component="div" className="text_center" sx={{ paddingBottom: '10px ' }} > Login </Typography>
        <InputTextField label="First Name" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
        <InputTextField label="Last Name" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
        <InputTextField label="Email" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        
        </Typography>
        <div className="dFlex jusitfyContentCenter">
          <SiderButton title="Send OTP" endIcon={<LuSend />} handalClick={handalOpenOtpModel} />
        </div>
      </Card>

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
    </div>
  );
}
