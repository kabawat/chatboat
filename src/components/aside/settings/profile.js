import Avatar from '@/components/comman/Avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { IoCheckmarkDone } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const Profile = () => {
    const profile = useSelector(state => state.profile.data)
    const router = useRouter()
    const handleLogout = () => {
        Cookies.remove('_x_a_t')
        router.push('/login')
        setTimeout(() => {
            window.location.reload()
        })
    }
    return (
        <div className='setting_inner_container'>
            <div className="profile_image d-flex justify-content-center">
                <div>
                    <Avatar size={100} src={profile?.picture} alt={profile?.firstName} fontSize={10} />
                </div>
            </div>
            <div className='text-center avatar_heading'>
                <b>{profile?.firstName} {profile?.lastName}</b>
            </div>
            <div className='text-center avatar_title'>
                {profile?.about}
            </div>
            <div className='mt-4'>
                <div className='avatar_title'>
                    <b>Email:</b>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className='avatar_title'>{profile?.email}</div>
                    <div className='avatar_title text-success isVerified'>{profile?.isVerified ? <IoCheckmarkDone /> : <></>}</div>
                </div>
            </div>
            <div className='mt-2'>
                <div className='avatar_title'>
                    <b>Username:</b>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className='avatar_title'>{profile?.username}</div>
                </div>
            </div>
            <div className='mt-2'>
                <div className='avatar_title'>
                    <b>Phone:</b>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className='avatar_title'>{profile?.phoneNumber}</div>
                </div>
            </div>
            <div className='mt-4 logout_btn'>
                <button class="avatar_title" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span class="px-2">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Profile
