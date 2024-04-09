import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import { useSelector } from 'react-redux'
const RightSideDrawer = () => {
    const currentUser = useSelector(state => state.current_user)
    return (
        <div className="user_profile_section">
            <div className="profile_detaile">
                <div className="profile_avator d-flex justify-content-center">
                    <Avatar alt={currentUser?.name} src={currentUser?.profile} sx={{ width: 160, height: 160 }} />
                </div>
                <div className="text-center profile_heading">
                    {currentUser?.name}
                </div>
                <Typography sx={{ fontSize: 14, textAlign: 'center', width: '50%', margin: 'auto' }} color="text.secondary" gutterBottom>
                    {currentUser?.about}
                </Typography>
            </div>
        </div>
    )
}

export default RightSideDrawer
