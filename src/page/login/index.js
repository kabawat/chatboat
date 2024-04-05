'use client'
import SiderButton from "@/components/button/SiderButton";
import { CheckBoxACheck } from "@/components/comman/checkBox";
import InputTextField from "@/components/form/field";
import { PageLoader } from "@/components/loader/pageLoader";
import { Card, Typography } from "@mui/material";
import Link from "next/link";
import { LuSend } from "react-icons/lu";
export default function LoginPage() {
    const loader = false
    const isForgotPassword = true
    const handalLogin = () => {

    }
    return (
        <div className="just_center">
            <Card className="form_card">
                <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Login </div>
                <InputTextField label="Email" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
                <InputTextField label="Password" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
                <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="pwd" className="d-inline-flex align-items-center py-2">
                        <CheckBoxACheck />
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
        </div>
    );
}
