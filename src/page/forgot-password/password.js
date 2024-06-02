'use client'
import ToastSnackbar from "@/components/Snackbar";
import SiderButton from "@/components/button/SiderButton";
import InputTextField from "@/components/form/field";
import { PageLoader } from "@/components/loader/pageLoader";
import OTPInput from "@/components/otp/otp";
import { _change_password, _forgot_password_otp, _verify_otp } from "@/controllers/password/password_reset";
import fetch_ip_Address_ from "@/service/fetchIPAddress";
import get_current_location_ from "@/service/getCurrentLocation";
import { Card, Dialog, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
const formInit = {
    password: '',
    confirm: ''
}
export default function ChangePassword() {
    const token = Cookies.get('')
    const [isOtpModal, setIsOtpModal] = useState(false)
    const [formData, setFormData] = useState(formInit)
    const [loader, setLoader] = useState(false)
    const [Toast, setToast] = useState(toastInit)
    const router = useRouter()


    const handleChange = ({ target }) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value
        })
    }


    // handle change password 
    const handleSubmit = async () => {
        setLoader(true)
        const token = Cookies.get('_x_p_a_t')
        const IP_address = await fetch_ip_Address_()
        const location = await get_current_location_()
        const timestamp = new Date()
        const headers = {
            'x-forwarded-for': IP_address,
            'x-access-token': token,
            'lat': location?.latitude,
            'lon': location?.longitude,
            'timestamp': timestamp.toISOString()
        }
        if (formData.password === formData.confirm) {
            const payload = {
                password: formData.password
            }
            const res = await _change_password(payload, headers)
            if (res.status) {
                setLoader(false)
                setToast({
                    ...Toast,
                    message: res?.data?.message,
                    type: 'success',
                    show: true,
                })
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            } else {
                setLoader(false)
                setToast({
                    ...Toast,
                    message: res?.message,
                    type: 'error',
                    show: true,
                })
            }
        } else {
            setLoader(false)
            setToast({
                ...Toast,
                message: 'Passwords do not match.',
                type: 'error',
                show: true,
            })
        }
    }

    return (
        <div className="just_center">
            <Card className="form_card">
                <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Forgot Password </div>
                <InputTextField name="password" value={formData?.password} onChange={handleChange} type="text" label="New Password" variant="standard" id="outlined-size-small" fullWidth sx={{ margin: '10px 0px' }} />
                <InputTextField name="confirm" value={formData?.confirm} onChange={handleChange} type="text" label="Confirm Password" variant="standard" id="outlined-size-small" fullWidth sx={{ margin: '10px 0px' }} />
                <div className="d-flex justify-content-center mt-2">
                    <SiderButton title={"Send OTP"} endIcon={<LuSend />} handalClick={handleSubmit} />
                </div>
                <Link href="/login" className="text-decoration-none">
                    <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
                        Login Option
                    </Typography>
                </Link>
            </Card>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
            {Toast?.show ? <ToastSnackbar handalClose={() => setToast(toastInit)} data={Toast} /> : <></>}
        </div>
    );
}