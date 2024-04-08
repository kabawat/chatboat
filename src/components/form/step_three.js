import InputTextField from "@/components/form/field";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
import { BsPlusLg } from "react-icons/bs";
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import endpoint from "@/api_endpoint";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const StepThree = ({ setStep, toastBox }) => {
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState()
    const [preview, setPriview] = useState()
    const handalChanage = ({ target }) => {
        const { files } = target
        setFile(files[0])
        const url = URL.createObjectURL(files[0]);
        setPriview(url)
    }

    const handalSubmit = async () => {
        try {
            setLoader(true)
            if (!file) throw new Error("Please select a file")
            let formData = new FormData();
            formData.append('file', file);
            formData.append('is_file', 1);
            const headers = {
                "x-verification-tokens": Cookies.get('_xvt')
            }
            const res = await axios.post(endpoint.FINISH_SIGNUP, formData, { headers })
            Cookies.remove('_xvt')
            Cookies.set('_x_a_t', res?.data?.authToken)
            router.push('/login')
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
    return (
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Profile Picture </div>
            <div className="my-3">
                <form className="d-flex justify-content-center overflow-hidden ">
                    <label htmlFor="file_input" className="drop-container">
                        {!preview ? <span> <BsPlusLg /></span> : <img src={preview} className="preview" alt="M" />}
                        <input type="file" accept="image/*" id="file_input" onChange={handalChanage} />
                    </label>
                </form>
                <Typography sx={{ fontSize: 14, textAlign: 'center', margin: '10px 0px' }} color="text.secondary" gutterBottom>
                    Drag & Drop
                </Typography>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"save & finish"} endIcon={<></>} handalClick={handalSubmit} />
            </div>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </>
    )
}

export default StepThree
