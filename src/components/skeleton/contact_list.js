import React from 'react'
import { Skeleton } from '@mui/material';
const ContactListSkeleton = () => {
    return (
        <div className="d-flex" >
            <div className='px-2'>
                <Skeleton variant="circular" width={50} height={50} animation="wave" />
            </div>
            <div>
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={150} />
            </div>
        </div>
    )
}

export default ContactListSkeleton
