'use client'
import SiderButton from "@/components/button/SiderButton";
import { DividerText, DividerTextShip } from "@/components/comman/DividerText";
import { CheckBoxACheck, CheckBoxAmin } from "@/components/comman/checkBox";
import InputTextField from "@/components/form/field";
import OTPInput from "@/components/otp/otp";
import { Box, Card, Dialog, DialogTitle, Typography } from "@mui/material";
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
      <Card className="form_card">
        <Typography variant="h5" component="div" className="text_center" sx={{ paddingBottom: '10px ' }} > Login </Typography>
        <InputTextField label="First Name" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px', }} />
        <InputTextField label="Last Name" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
        <InputTextField label="Email" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
        <div className="d-flex align-items-center py-2">
          <CheckBoxACheck />
          <Typography sx={{ fontSize: 14, textAlign: 'center', padding: '0px 10px' }} color="text.secondary" >
            remember me
          </Typography>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <SiderButton title="Send OTP" endIcon={<LuSend />} handalClick={handalOpenOtpModel} />
        </div>
        <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
          Don't have an account?  <Link href="/" >Signup</Link>
        </Typography>
        <Box sx={{ padding: '10px 0px' }}>
          <DividerText align={'center'} label={"Or"} />
        </Box>
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
