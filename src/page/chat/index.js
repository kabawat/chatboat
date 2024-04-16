"use client"
import Navigate from '@/components/aside/navigate'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import NoChat from '@/components/chat/no-chat';
import ChatContainer from '@/components/chat/chat-container';
import { useSelector, useDispatch } from 'react-redux'
import { handalCurrentUser } from '@/redux/slice/user';
// import socket from '@/socket';
import Avatar from '@/components/comman/Avatar';
import ContactListSkeleton from '@/components/skeleton/contact_list';
import SearchSkeleton from '@/components/skeleton/seach_bar';
const chatList = [
    {
        _id: '093803845',
        name: "Mukesh Singh",
        last_seen: "10 min ago",
        profile: '',
        lastMsg: "Xhattmahs is not attacking attacking attacking attacking your base!",
        notification: '12',
        about: 'Full Stack Developer'
    },
    {
        _id: '093803846',
        name: "Narendra Singh",
        last_seen: "13 min ago",
        profile: '',
        lastMsg: "Xhattmahs is not attacking attacking attacking attacking your base!",
        notification: '78',
        about: 'React Developer'
    },
    {
        _id: '093803847',
        name: "Milap Singh",
        last_seen: "40 min ago",
        profile: '',
        lastMsg: "Xhattmahs is not attacking attacking attacking attacking your base!",
        notification: '100',
        about: 'Node Developer'
    },
    {
        _id: '093803848',
        name: "denny jangid",
        last_seen: "6 min ago",
        profile: '',
        lastMsg: "Xhattmahs is not attacking attacking attacking attacking your base!",
        notification: '90',
        about: 'MERN Developer'
    },
]
const ChatPage = () => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)
    const { socket } = useSelector(state => state.socket)
    const chat_profile = useSelector(state => state.current_user)
    const profile = useSelector(state => state.profile)
    const [onlineUser, setOnlineUser] = useState('')
    // select user from list 
    const handalSelectChat = (data) => {
        dispatch(handalCurrentUser(data))
    }
    // socket 
    useEffect(() => {
        console.log("socket.id : ", socket.id)
        const logedinHandler = (data) => {
            console.log("data : ", data)
            setOnlineUser(data?.message)
            setTimeout(() => {
                setOnlineUser("")
            }, 5000)
        };
        socket.on('joined', logedinHandler);
        // Cleanup function to remove the event listener when component unmounts
        return () => {
            socket.off('joined', logedinHandler);
        };
    }, []);
    return (
        <div className={`${theme === 'dark' ? 'dark_mode' : ''} chat_containner`}>
            {onlineUser ? <div className='online_user'> {onlineUser}</div> : <></>}
            <div id='aside'>
                <div className="aside">
                    <div className="inner_side">
                        {/* profile section  */}
                        <div className="side_profile">
                            {
                                profile?.status ? <>
                                    <div className="d-flex align-items-center profile_main">
                                        <Avatar alt={profile?.data?.firstName} src="/" size={50} />
                                        <div className='px-2'>
                                            <div className="avatar_heading">
                                                <b>{profile?.data?.firstName} {profile?.data?.lastName}</b>
                                            </div>
                                            <div className="avatar_title">
                                                {profile?.data?.about}
                                            </div>
                                        </div>
                                    </div>
                                </> : <>
                                    <ContactListSkeleton />
                                </>
                            }
                            <div className="search py-2">
                                {
                                    profile?.status ? <>
                                        <div className="searchbar d-flex">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <IoSearchOutline />
                                            </div>
                                            <div className="search_field">
                                                <input type="text" placeholder="Search..." />
                                            </div>
                                        </div>
                                    </> : <SearchSkeleton />
                                }
                            </div>
                        </div>

                        {/* chat list  */}
                        <div className="side_main">
                            <div className="chatList_main_container">
                                {
                                    profile?.status ? chatList?.map((currentChat, key) => {
                                        return (
                                            <div className={`chat_card d-flex align-items-center ${chat_profile?._id == currentChat?._id ? 'active' : ''}`} key={key} onClick={() => handalSelectChat(currentChat)}>
                                                <Avatar alt={currentChat?.name} src="/static/images/avatar/1.jpg" size={40} />
                                                <div className="textBox">
                                                    <div className="textContent">
                                                        <p className="h1">{currentChat?.name}</p>
                                                        <span className="span">{currentChat?.last_seen}</span>
                                                    </div>
                                                    <p className="p">{currentChat?.lastMsg}</p>
                                                </div>
                                            </div>
                                        )
                                    }) : Array.from({ length: 8 }).map((_, key) => {
                                        return <div className="py-2" key={key}>
                                            <ContactListSkeleton />
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* aside navigate  */}
                <Navigate />
            </div>
            <main>
                {chat_profile?.status ? <ChatContainer /> : <NoChat />}
            </main>
        </div>
    )
}

export default ChatPage