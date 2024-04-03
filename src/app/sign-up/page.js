'use client'
import StepOne from "@/components/form/step_one";
import { MdKeyboardBackspace } from "react-icons/md";
import StepThree from "@/components/form/step_three";
import StepTwo from "@/components/form/step_two";
import { Card, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function BasicGrid() {
    const [step, setStep] = useState(3)
    return (
        <div className="just_center">
            <Card className="form_card">
                <div className="d-flex justify-content-between">
                    {
                        // back button
                        step !== 1 ? <>
                            <div className="back-btn" onClick={() => setStep(1)}>
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
                {step === 1 ? <StepOne /> : <></>}
                {/* step Two  */}
                {step === 2 ? <StepTwo /> : <></>}
                {/* step Three  */}
                {step === 3 ? <StepThree /> : <></>}

                <Typography sx={{ fontSize: 14, textAlign: 'center', paddingTop: '18px' }} color="text.secondary" gutterBottom>
                    Already have an account?  <Link href="/login" >Login</Link>
                </Typography>
            </Card>
        </div>
    );
}
