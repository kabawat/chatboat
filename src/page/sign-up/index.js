'use client'
import StepOne from "@/components/form/step_one";
import { MdKeyboardBackspace } from "react-icons/md";
import StepThree from "@/components/form/step_three";
import StepTwo from "@/components/form/step_two";
import { Card, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ToastSnackbar from "@/components/Snackbar";

export default function SignUpPage() {
    const toastInit = {
        show: false,
        message: "",
        type: "",
        duration: 5000,
        vertical: "top",
        horizontal: 'center'
    }
    const [step, setStep] = useState(1)
    const [Toast, setToast] = useState(toastInit)
    const handalToast = (value) => {
        setToast({
            ...Toast,
            ...value
        })
    }
    return (
        <div className="just_center">
            <Card className="form_card">
                <div className="d-flex justify-content-between">
                    {
                        // back button
                        step !== 1 ? <>
                            <div className="back-btn" onClick={() => setStep(step == 2 ? 1 : 2)}>
                                <MdKeyboardBackspace />
                            </div>
                        </> : <></>
                    }
                    {
                        // skip button
                        step === 3 ? <>
                            <div className="skip">
                                skip
                            </div>
                        </> : <></>
                    }
                </div>
                {/* step one  */}
                {step === 1 ? <StepOne setStep={setStep} toastBox={handalToast} /> : <></>}
                {/* step Two  */}
                {step === 2 ? <StepTwo setStep={setStep} toastBox={handalToast} /> : <></>}
                {/* step Three  */}
                {step === 3 ? <StepThree setStep={setStep} /> : <></>}

                <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
                    Already have an account?  <Link href="/login" >Login</Link>
                </Typography>
            </Card>
            {Toast?.show ? <ToastSnackbar handalClose={() => setToast(toastInit)} data={Toast} /> : <></>}
        </div>
    );
}
