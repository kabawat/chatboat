import InputTextField from "@/components/form/field";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
const StepTwo = () => {
    const loader = false
    // submit form
    const handalSubmit = () => {

    }

    return (
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Create Account </div>
            <InputTextField label="Username" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
            <InputTextField label="Password" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
            <InputTextField label="Verify Password" variant="standard" id="outlined-size-small" defaultValue="" fullWidth sx={{ margin: '10px 0px' }} />
            <div className="d-flex justify-content-center mt-2">
                <SiderButton title={"Save & Next"} endIcon={<></>} handalClick={handalSubmit} />
            </div>

            {/* loader  */}
            {loader ? <div className="fixedPostionSection"> <PageLoader /> </div> : <></>}
        </>
    )
}

export default StepTwo
