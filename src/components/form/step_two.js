import InputTextField from "@/components/form/field";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
import { useState } from "react";
import endpoint from "@/api_endpoint";
import { Typography } from "@mui/material";
import { CheckBoxACheck } from "../comman/checkBox";
import ServiceVerifyApi from "@/service/verify_service";
const StepTwo = ({ setStep, toastBox }) => {
    const Service = ServiceVerifyApi()
    const [loader, setLoader] = useState(false);
    const [showPwd, setShowPwd] = useState(false)
    const formInit = {
        username: "",
        password: "",
    }
    const [formData, setFormData] = useState(formInit)

    const handalChange = ({ target }) => {
        const { name, value } = target;
        setFormData({ ...formData, [name]: value });
    }

    // submit form
    const handalSubmit = async () => {
        try {
            setLoader(true);
            const { username, password } = formData
            if (!username && !password) throw new Error("Oops! Looks like you forgot to fill out everything. 🤔")
            if (!username) throw new Error("Hey there! Username field can't be empty")
            if (!password) throw new Error("Hey there! Password field can't be empty, friend!")
            const res = await Service.post(endpoint?.REGISTRATION, formData)
            toastBox({
                message: res?.data?.message,
                type: 'success',
                show: true,
            })
            setStep(3)
        } catch (error) {
            toastBox({
                message: error?.response?.data?.error ? error?.response?.data?.error : error?.message,
                type: 'error',
                show: true,
            })
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Create Account </div>
            <InputTextField type="text" onChange={handalChange} name="username" value={formData?.username} label="Username" variant="standard" fullWidth className="py-2" />
            <InputTextField type={showPwd ? "text" : "password"} onChange={handalChange} name="password" value={formData?.password} label="Password" variant="standard" fullWidth className="py-2" />
            <label htmlFor="pwd" className="d-inline-flex align-items-center py-2">
                <CheckBoxACheck id={'pwd'} checked={showPwd} onChange={() => setShowPwd(!showPwd)} />
                <Typography sx={{ fontSize: 14, textAlign: 'center', padding: '0px 6px' }} color="text.secondary" >
                    Show Password
                </Typography>
            </label>
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"Save & Next"} endIcon={<></>} handalClick={handalSubmit} />
            </div>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </>
    )
}

export default StepTwo
