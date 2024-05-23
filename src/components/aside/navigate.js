import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BsChatLeftText } from 'react-icons/bs'
import { HiStatusOnline } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';

import { MdComputer } from 'react-icons/md'
import { IoKeyOutline, IoChatbubblesOutline, IoNotificationsOutline } from 'react-icons/io5'
import { BiUser } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'
import { BsBrush } from "react-icons/bs";
import { useState } from 'react'
import General from './settings/General';
import Personalization from './settings/personalization';
import Avatar from '../comman/Avatar';
import Profile from './settings/profile';
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

const settingList = [
    {
        icon: <MdComputer />,
        title: 'General',
        components: <General />
    },
    {
        icon: <IoKeyOutline />,
        title: 'Account',
        components: <>3</>
    },
    {
        icon: <IoChatbubblesOutline />,
        title: 'Chats',
        components: <>4</>
    },
    {
        icon: <IoNotificationsOutline />,
        title: 'Notification',
        components: <>5</>
    },
    {
        icon: <BsExclamationCircle />,
        title: 'Help',
        components: <>6</>
    },
    {
        icon: <BsBrush />,
        title: 'Personalization',
        components: <Personalization />
    },
    {
        icon: <BiUser />,
        title: 'Profile',
        components: <Profile />
    },
]
const Navigate = () => {
    const [currentSetting, setCurrentSetting] = useState(settingList[0])
    const [isSetting, setIsSetting] = useState(false)
    const pathname = usePathname()

    const handleSetting = (data) => {
        setCurrentSetting(data)
        setIsSetting(true)
    }

    const handalModalClose = (event) => {
        if (event.target.id == "settings_model") {
            setIsSetting(false)
        }
    }
    return (
        <div className="navigate d-flex flex-column justify-content-between h-100">
            <div className=''>
                {
                    navigateData?.map((item, keys) => {
                        return (
                            <div className="py-1" key={keys}>
                                <div className={`link ${pathname == item?.link ? 'active' : ''}`}>
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
                    <div className={`setting-btn ${isSetting ? 'active' : ''}`} onClick={() => handleSetting(settingList[0])}>
                        <IoSettingsOutline />
                    </div>
                </div>
                <div className='my-1' style={{ cursor: 'pointer' }} onClick={() => handleSetting(settingList[settingList?.length - 1])}>
                    <Avatar size={30} alt="Mukesh Singh" src="/avatar/broken-image.pn" />
                    {/*   */}
                </div>
                {
                    isSetting ? <div className="settings_model" id='settings_model' onClick={handalModalClose}>
                        <div className="settings">
                            <div className="settings_list">
                                <div className="setting_menu">

                                    {
                                        settingList?.map((item, key) => {
                                            if (settingList?.length - 1 > key) {
                                                return (
                                                    <div className={`setting_btn ${currentSetting?.title == item?.title ? 'active' : ''}`} onClick={() => handleSetting(item)}>
                                                        <div className="setting_btn_section">
                                                            <div className="icon">
                                                                {item?.icon}
                                                            </div>
                                                            <div className="text">
                                                                {item?.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>


                                {/* profile section  */}
                                <div className="setting_menu">
                                    <div className="setting_menu_item">
                                        <div className={`setting_btn ${currentSetting?.title == 'Profile' ? 'active' : ''}`} onClick={() => handleSetting(settingList[settingList?.length - 1])}>
                                            <div className="setting_btn_section">
                                                <div className="icon">
                                                    {settingList[settingList?.length - 1].icon}
                                                </div>
                                                <div className="text">
                                                    {settingList[settingList?.length - 1].title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="settings_section">
                                <div className="settings_section_inner">
                                    {currentSetting?.components}
                                </div>
                            </div>
                        </div>
                    </div> : <></>
                }

            </div>
        </div >
    )
}

export default Navigate
