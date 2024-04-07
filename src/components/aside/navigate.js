import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BsChatLeftText } from 'react-icons/bs'
import { HiStatusOnline } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import Avatar from '@mui/material/Avatar';
const navigateData = [
    {
        link: '/chat',
        icon: <BsChatLeftText />,
        badgeContent: 100,
    },
    {
        link: '/story',
        icon: <HiStatusOnline />,
        badgeContent: 3,
    },
]
const Navigate = () => {
    const isSetting = false
    const pathname = usePathname()
    return (
        <div className="navigate d-flex flex-column justify-content-between h-100">
            <div className=''>
                {
                    navigateData?.map((item, keys) => {
                        return (
                            <div className="py-1" key={keys}>
                                <div className={`link ${pathname == item?.link && 'active'}`}>
                                    <Link href={item?.link} className='d-flex align-items-center justify-content-center'>
                                        {item?.icon}
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div className='d-flex flex-column align-items-center'>
                <div className='w-100'>
                    <div className={`setting-btn ${isSetting && 'active'}`}>
                        <IoSettingsOutline />
                    </div>
                </div>
                <div className='my-1'>
                    <Avatar alt="Mukesh Singh" src="/avatar/broken-image.png" sx={{ width: 30, height: 30 }} />
                </div>
            </div>
        </div>
    )
}

export default Navigate
