import Avatar from '@/components/comman/Avatar';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const TextMessage = ({ it_chat, handleContextMenu, keys }) => {
    // universal state 
    const current_user = useSelector(state => state.current_user)
    const profile = useSelector(state => state.profile)
    const currentDate = new Date(it_chat?.createdAt);
    const timeString = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    if (`${profile?.data?._id}` == `${it_chat?.receiver}`) {
        return (
            <div className="msg left-msg">
                <div className="msg-img">
                    <Avatar alt="m" src="/static/images/avatar/1.jpg" size={45} />
                </div>

                <div className="msg-bubble" onContextMenu={(e) => handleContextMenu(e, { ...it_chat, id: keys })}>
                    <div className="msg-info">
                        <div className="msg-info-name">{`${current_user?.firstName} ${current_user?.lastName}`}</div>
                        <div className="msg-info-time text-success">{timeString}</div>
                    </div>
                    <div className="msg-text">
                        {it_chat?.text}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="msg right-msg">
                <div className="msg-img">
                    <Avatar alt="m" src="/static/images/avatar/1.jpg" size={45} />
                </div>

                <div className="msg-bubble" onContextMenu={(e) => handleContextMenu(e, { ...it_chat, id: keys })}>
                    <div className="msg-info">
                        <div className="msg-info-name">{`${profile?.data?.firstName} ${profile?.data?.lastName}`}</div>
                        <div className="msg-info-time">{timeString}</div>
                    </div>

                    <div className="msg-text">
                        {it_chat?.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default TextMessage
