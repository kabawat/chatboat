import React from 'react'
import { Typography } from "@mui/material";
import { useSelector } from 'react-redux'
import Avatar from '@/components/comman/Avatar';
const RightSideDrawer = () => {
    const currentUser = useSelector(state => state.current_user)
    return (
        <div className="user_profile_section">
            <div className="profile_detaile">
                <div className="profile_avator d-flex justify-content-center">
                    <Avatar alt={'M'} src={currentUser?.picture} size={160} />
                </div>
                <div className="text-center profile_heading">
                    {currentUser?.firstName} {currentUser?.lastName}
                </div>
                <Typography sx={{ fontSize: 14, textAlign: 'center', width: '50%', margin: 'auto' }} color="text.secondary" gutterBottom>
                    {currentUser?.about}
                </Typography>
            </div>
        </div>
    )
}

export default RightSideDrawer
