"use client"
import Navigate from '@/components/aside/navigate'
import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import NoChat from '@/components/chat/no-chat';
import ChatContainer from '@/components/chat/chat-container';
const ChatPage = () => {
    const [isDarkMode, setDarkMode] = useState(false)
    const [isChat, setIsChat] = useState(true)
    return (
        <div className={`chat_containner ${isDarkMode && 'dark_mode'}`}>
            <aside>
                <div className="aside">
                    <div className="inner_side">
                        {/* profile section  */}
                        <div className="side_profile">
                            <div className="d-flex align-items-center profile_main">
                                <Avatar alt="" src="/static/images/avatar/1.jpg" sx={{ width: 50, height: 50 }} />
                                <div className='px-2'>
                                    <div className="avatar_heading">
                                        <b> Ms Rajputana</b>
                                    </div>
                                    <div className="avatar_title">
                                        Full stack dev
                                    </div>
                                </div>
                            </div>
                            <div className="search py-2">
                                <div className="searchbar d-flex">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <IoSearchOutline />
                                    </div>
                                    <div className="search_field">
                                        <input type="text" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* chat list  */}
                        <div className="side_main">
                            <div className="chatList_main_container">
                                {
                                    Array.from({ length: 10 }).map((_, key) => {
                                        return (
                                            <div className="chat_card d-flex align-items-center" key={key}>
                                                <Avatar alt={`${key}`} src="/static/images/avatar/1.jpg" sx={{ width: 40, height: 40 }} />
                                                <div className="textBox">
                                                    <div className="textContent">
                                                        <p className="h1">Clans of Clash</p>
                                                        <span className="span">12 min ago</span>
                                                    </div>
                                                    <p className="p">Xhattmahs is not attacking attacking attacking attacking your base!</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* aside navigate  */}
                <Navigate />
            </aside>
            <main>
                {isChat ? <ChatContainer /> : <NoChat />}
            </main>
        </div>
    )
}

export default ChatPage