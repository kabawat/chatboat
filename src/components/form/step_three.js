import Cookies from "js-cookie";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { BsPlusLg } from "react-icons/bs";

import ServiceVerifyApi from "@/service/verify_service";
import SiderButton from "@/components/button/SiderButton";
import endpoint from "@/api_endpoint";

import { PageLoader } from "@/components/loader/pageLoader";
import { Typography } from "@mui/material";

import CropPicture from "./crop_img";
const StepThree = ({ setStep, toastBox }) => {
    const [isCropModal, setIsCropModal] = useState(false)
    const [preview, setPriview] = useState(null)
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState()

    const previewCanvasRef = useRef(null);
    const Service = ServiceVerifyApi()
    const router = useRouter()

    const handalChanage = ({ target }) => {
        const { files } = target
        setFile(files[0])
        const url = URL.createObjectURL(files[0]);
        setPriview(url)
        setIsCropModal(true)
    }

    const handleSubmit = async () => {
        try {
            const file_res = await canvasToFile(previewCanvasRef)
            let formData = new FormData();
            formData.append('file', file_res);
            formData.append('is_file', 1);
            const res = await Service.post(endpoint.FINISH_SIGNUP, formData)
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
    function canvasToFile(canvasRef) {
        return new Promise((resolve, reject) => {
            const canvas = canvasRef.current;
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Failed to convert canvas to blob'));
                    return;
                }
                const file = new File([blob], 'generated_image.png', { type: 'image/png' });
                resolve(file);
            }, 'image/png');
        });
    }

    return (
        <>
            {
                preview && isCropModal ? <CropPicture preview={preview} previewCanvasRef={previewCanvasRef} setIsCropModal={setIsCropModal} /> : null

            }
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Profile Picture </div>
            <div className="my-3">
                <form className="d-flex justify-content-center overflow-hidden ">
                    <label htmlFor="file_input" className="drop-container">
                        {!preview ? <span> <BsPlusLg /></span> : <canvas ref={previewCanvasRef} />}
                        <input type="file" accept="image/*" id="file_input" onChange={handalChanage} />
                    </label>
                </form>
                <Typography sx={{ fontSize: 14, textAlign: 'center', margin: '10px 0px' }} color="text.secondary" gutterBottom>
                    Drag & Drop
                </Typography>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"save & finish"} endIcon={<></>} handalClick={handleSubmit} />
            </div>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </>
    )
}

export default StepThree
