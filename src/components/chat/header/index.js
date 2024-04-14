import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '@/redux/slice/theme';
import Avatar from '@/components/comman/Avatar';
const Header = ({ setIsProfile }) => {
    const currentUser = useSelector(state => state.current_user)
    return (
        <div className="chat_navbar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center active_user" onClick={() => setIsProfile(true)}>
                <Avatar alt={currentUser?.name} src={currentUser?.profile} size={42} />
                <div className='px-2'>
                    <div className="avatar_heading">
                        <b> {currentUser?.name}</b>
                    </div>
                    <div className="avatar_title">
                        {currentUser?.last_seen}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
