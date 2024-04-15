'use client'
import endpoint from "@/api_endpoint";
import ToastSnackbar from "@/components/Snackbar";
import SiderButton from "@/components/button/SiderButton";
import { CheckBoxACheck } from "@/components/comman/checkBox";
import InputTextField from "@/components/form/field";
import { PageLoader } from "@/components/loader/pageLoader";
import { get_profile } from "@/redux/slice/profile";
import { Card, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuSend } from "react-icons/lu";
import { useDispatch } from "react-redux";
export default function LoginPage() {
    const toastInit = {
        show: false,
        message: "",
        type: "",
        duration: 5000,
        vertical: "top",
        horizontal: 'center'
    }
    const formInit = {
        email: '',
        password: '',
    }
    const router = useRouter()
    const dispatch = useDispatch()
    const [Toast, setToast] = useState(toastInit)
    const [loader, setLoader] = useState(false)
    const isForgotPassword = true
    const [showPwd, setShowPwd] = useState(false)
    const [formData, setFormData] = useState(formInit)

    const handalChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handalLogin = async () => {
        const { email, password } = formData
        try {
            if (email == "" || password == "") {
                throw new Error('All fields are required, Try again or sign up!')
            }
            const res = await axios.post(endpoint?.LOGIN, formData)
            setToast({
                ...Toast,
                message: res?.data?.message,
                type: 'success',
                show: true,
            })
            // get loged in user profile 
            const saved = await dispatch(get_profile({ token: res?.data?.authToken }))
            // after create socekt id
            setTimeout(() => {
                Cookies.set('_x_a_t', res?.data?.authToken)
                router.push('/chat')
            }, 2000)
        } catch (error) {
            setToast({
                ...Toast,
                message: error?.response?.data?.error ? error?.response?.data?.error : error?.message,
                type: 'error',
                show: true,
            })
        }
    }
    return (
        <div className="just_center">
            <Card className="form_card">
                <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Login </div>
                <InputTextField name="email" value={formData.email} onChange={handalChange} type="text" label="Email" variant="standard" id="outlined-size-small" fullWidth sx={{ margin: '10px 0px' }} />
                <InputTextField name="password" value={formData.password} onChange={handalChange} type={showPwd ? "text" : "password"} label="Password" variant="standard" id="outlined-size-small" fullWidth sx={{ margin: '10px 0px' }} />
                <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="pwd" className="d-inline-flex align-items-center py-2">
                        <CheckBoxACheck id={'pwd'} checked={showPwd} onChange={() => setShowPwd(!showPwd)} />
                        <Typography sx={{ fontSize: 14, textAlign: 'center', padding: '0px 6px' }} color="text.secondary" >
                            Show Password
                        </Typography>
                    </label>
                    {
                        isForgotPassword ? <>
                            <Link href={"/forgot-password"} >
                                <Typography sx={{ fontSize: 14, textAlign: 'center', padding: '0px 6px', textDecoration: 'none' }} color="text.secondary" >
                                    Forgot
                                </Typography>
                            </Link>
                        </> : <></>
                    }
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <SiderButton title={"Login"} endIcon={<LuSend />} handalClick={handalLogin} />
                </div>
                <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
                    Don't have an account?  <Link href="/sign-up" >Signup</Link>
                </Typography>

            </Card>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
            {Toast?.show ? <ToastSnackbar handalClose={() => setToast(toastInit)} data={Toast} /> : <></>}
        </div>
    );
}
