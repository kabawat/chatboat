import InputTextField from "@/components/form/field";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
import { useState } from "react";
import Cookies from "js-cookie";
import endpoint from "@/api_endpoint";
import axios from "axios";
const StepTwo = ({ setStep, toastBox }) => {
    const loader = false
    const formInit = {
        username: "",
        password: "",
        confirm_password: ""
    }
    const [formData, setFormData] = useState(formInit)

    const handalChange = ({ target }) => {
        const { name, value } = target;
        setFormData({ ...formData, [name]: value });
    }

    // submit form
    const handalSubmit = async () => {
        try {
            const { username, password, confirm_password } = formData
            if (!username && !password && !confirm_password) throw new Error("Oops! Looks like you forgot to fill out everything. 🤔")
            if (!username) throw new Error("Hey there! Username field can't be empty")
            if (password !== confirm_password) throw new Error("Make sure passwords match, friend!")
            const headers = {
                "x-verification-tokens": Cookies.get('_xvt')
            }
            const res = await axios.post(endpoint?.REGISTRATION, formData, { headers })
            toastBox({
                message: res?.data?.message,
                type: 'success',
                show: true,
            })
        } catch (error) {
            toastBox({
                message: error?.response?.data?.error ? error?.response?.data?.error : error?.message,
                type: 'error',
                show: true,
            })
        }
    }

    return (
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Create Account </div>
            <InputTextField onChange={handalChange} name="username" value={formData?.username} label="Username" variant="standard" fullWidth className="py-2" />
            <InputTextField onChange={handalChange} name="password" value={formData?.password} label="Password" variant="standard" fullWidth className="py-2" />
            <InputTextField onChange={handalChange} name="confirm_password" value={formData?.confirm_password} label="Verify Password" variant="standard" fullWidth className="py-2" />
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"Save & Next"} endIcon={<></>} handalClick={handalSubmit} />
            </div>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </>
    )
}

export default StepTwo
