import React from 'react'
import { RiWechatLine } from 'react-icons/ri'
const NoChat = () => {
    return (
        <div className='no_chat'>
            <div className="inner_chat d-flex align-items-center justify-content-center">
                <div className='d-flex flex-column align-items-center'>
                    <div className="no_chat_logo">
                        <RiWechatLine />
                    </div>
                    <div className="no_chat_title">
                        Welcome To QueryBoat
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoChat
