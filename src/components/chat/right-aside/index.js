import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
const RightSideDrawer = () => {
    return (
        <div className="user_profile_section">
            <div className="profile_detaile">
                <div className="profile_avator d-flex justify-content-center">
                    <Avatar alt="M" src="/static/images/avatar/1.jpg" sx={{ width: 160, height: 160 }} />
                </div>
                <div className="text-center profile_heading">
                    Ms Rajputana
                </div>
                <Typography sx={{ fontSize: 14, textAlign: 'center', width: '50%', margin: 'auto' }} color="text.secondary" gutterBottom>
                    Full Stack Developer
                </Typography>
            </div>
        </div>
    )
}

export default RightSideDrawer
