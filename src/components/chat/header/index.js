import React from 'react'
import { useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { changeTheme } from '@/redux/slice/theme';
const Header = ({ setIsProfile }) => {
    const dispatch = useDispatch()
    const handalChangeTheme = () => {
        dispatch(changeTheme())
    }
    return (
        <div className="chat_navbar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center active_user" onClick={() => setIsProfile(true)}>
                <Avatar alt="M" src="/static/images/avatar/1.jpg" sx={{ width: 42, height: 42 }} />
                <div className='px-2'>
                    <div className="avatar_heading">
                        <b> Ms Rajputana</b>
                    </div>
                    <div className="avatar_title">
                        Full stack dev
                    </div>
                </div>
            </div>
            <button onClick={handalChangeTheme}>Dark</button>
        </div>
    )
}

export default Header
