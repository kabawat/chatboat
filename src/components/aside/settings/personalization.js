import { CheckBoxACheck } from '@/components/comman/checkBox'
import React from 'react'
import { Typography } from "@mui/material";
import ThemeSwitch from '@/components/comman/themeSwitch';
const Personalization = () => {
    return (
        <div className='setting_main_section'>
            <div className='setting_heading'>
                <strong>Personalization</strong>
            </div>
            <div className='Accordion'>
                <div className="title">
                    Theme
                </div>
                <div className="content">
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    )
}

export default Personalization
