import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { changeTheme } from '@/redux/slice/theme';
const Header = ({ setIsProfile }) => {
    const currentUser = useSelector(state => state.current_user)
    const dispatch = useDispatch()
    const handalChangeTheme = () => {
        dispatch(changeTheme())
    }
    return (
        <div className="chat_navbar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center active_user" onClick={() => setIsProfile(true)}>
                <Avatar alt={currentUser?.name} src={currentUser?.profile} sx={{ width: 42, height: 42 }} />
                <div className='px-2'>
                    <div className="avatar_heading">
                        <b> {currentUser?.name}</b>
                    </div>
                    <div className="avatar_title">
                        {currentUser?.last_seen}
                    </div>
                </div>
            </div>
            <button onClick={handalChangeTheme}>Dark</button>
        </div>
    )
}

export default Header
