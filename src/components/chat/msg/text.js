import React, { useEffect, useState } from 'react'
import { formatTimeDifference } from '@/helper/timeCal';
import { useSelector } from 'react-redux';
import Avatar from '@/components/comman/Avatar';

const TextMessage = ({ it_chat, handleContextMenu, keys, clipBoardReact }) => {
    // universal state 
    const current_user = useSelector(state => state.current_user)
    const profile = useSelector(state => state.profile)
    const [timeString, setTimeString] = useState(formatTimeDifference(it_chat?.createdAt))
    useEffect(() => {
        setInterval(() => {
            setTimeString(formatTimeDifference(it_chat?.createdAt))
        }, 60000)
    }, [])
    if (`${profile?.data?._id}` == `${it_chat?.receiver}`) {
        return (
            <div className="msg left-msg">
                <div className="msg-img">
                    <Avatar alt="m" src={current_user?.picture || "/static/images/avatar/1.jpg"} size={45} />
                </div>

                <div className="msg-bubble" onContextMenu={(e) => handleContextMenu(e, { ...it_chat, id: keys })}>
                    <div className="msg-text">
                        {it_chat?.text}
                    </div>
                    <div className="msg-info">
                        {/* <div className="msg-info-name">{`${current_user?.firstName} ${current_user?.lastName}`}</div> */}
                        <div className="msg-info-time text-success">{timeString}</div>
                    </div>
                </div>
                {clipBoardReact != null && clipBoardReact?.id == keys ? <div className="ClipBoard">{clipBoardReact?.msg}</div> : <></>}
            </div>
        )
    } else {
        return (
            <div className="msg right-msg">
                <div className="msg-bubble" onContextMenu={(e) => handleContextMenu(e, { ...it_chat, id: keys })}>

                    <div className="msg-text">
                        {it_chat?.text}
                    </div>
                    <div className="msg-info">
                        {/* <div className="msg-info-name">{`${profile?.data?.firstName} ${profile?.data?.lastName}`}</div> */}
                        <div className="msg-info-time">{timeString}</div>
                    </div>
                </div>
                {clipBoardReact != null && clipBoardReact?.id == keys ? <div className="ClipBoard">{clipBoardReact?.msg}</div> : <></>}
            </div>
        )
    }
}

export default TextMessage
