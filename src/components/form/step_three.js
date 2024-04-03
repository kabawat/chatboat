import InputTextField from "@/components/form/field";
import SiderButton from "@/components/button/SiderButton";
import { PageLoader } from "@/components/loader/pageLoader";
import { BsPlusLg } from "react-icons/bs";
import { Typography } from "@mui/material";
const StepThree = () => {
    const loader = false
    // submit form
    const handalSubmit = () => {

    }

    return (
        <>
            <div component="div" className="text_center form-heading" sx={{ paddingBottom: '10px ' }} > Profile Picture </div>

            <div className="my-3">
                <form class="form d-flex justify-content-center">
                    <label htmlFor="file-input" class="drop-container">
                        <span>
                            <BsPlusLg />
                        </span>
                        <input type="file" accept="image/*" required="" id="file-input" onChange={({ target }) => console.log(target.files)} />
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
