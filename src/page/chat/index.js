"use client"
import Navigate from '@/components/aside/navigate'
import React, { useEffect, useRef, useState } from 'react'
import NoChat from '@/components/chat/no-chat';
import ChatContainer from '@/components/chat/chat-container';
import { useSelector, useDispatch } from 'react-redux'
import { handalCurrentUser } from '@/redux/slice/user';
import Avatar from '@/components/comman/Avatar';
import ContactListSkeleton from '@/components/skeleton/contact_list';
import SearchSkeleton from '@/components/skeleton/seach_bar';
import Search from './search';
import { add_new_chat, get_chat } from '@/redux/slice/chat';
import Cookies from 'js-cookie';
import { _mark_message_as_read } from '@/controllers/chat/mark_as_read';
import { get_contact_list, udpate_contact_list } from '@/redux/slice/chat/chat_contact';
import { _scrollToEnd, _scrollToEndSmoothly } from '@/controllers/comman/scroll_to_end';
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
    const mainRef = useRef(null);
    // const chat = useSelector(state => state.chat)
    const theme = useSelector(state => state.theme)
    const { socket } = useSelector(state => state.socket)
    const current_user = useSelector(state => state.current_user)
    const profile = useSelector(state => state.profile)
    const contacts = useSelector(state => state.contact)
    const [onlineUser, setOnlineUser] = useState('')
    const token = Cookies.get('_x_a_t')
    // select user from list 
    const handalSelectChat = async (data) => {
        const payload = {
            chat_id: data?.chat_id,
            userID: profile?.data?._id
        }
        await _mark_message_as_read(payload, token)
        await dispatch(get_chat({ token, chat_id: data?.chat_id }))
        await dispatch(handalCurrentUser(data))
        _scrollToEnd(mainRef)
    }
    useEffect(() => {
        if (!contacts?.status && !contacts?.loading) {
            dispatch(get_contact_list({ token }))
        }
    }, [contacts])
    // socket 
    useEffect(() => {
        const logedinHandler = (data) => {
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

    useEffect(() => {
        const handalReceivedMessage = (data) => {
            if (`${current_user?.chat_id}` == `${data?.chat_id}`) {
                const payload = {
                    chat_id: data?.chat_id,
                    userID: profile?.data?._id
                }
                _mark_message_as_read(payload, token).then((res) => {
                    dispatch(add_new_chat(data))
                })
                _scrollToEndSmoothly(mainRef)
            }
            dispatch(udpate_contact_list(data)) // update last seen message 
        }
        socket.on("received text", handalReceivedMessage)
        return () => {
            socket.off("received text", handalReceivedMessage)
        };
    }, [current_user])

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
                                        <Search />
                                    </> : <SearchSkeleton />
                                }
                            </div>
                        </div>

                        {/* chat list  */}
                        <div className="side_main">
                            <div className="chatList_main_container">
                                {
                                    contacts?.status ? contacts?.data?.map((currentChat, key) => {
                                        return (
                                            <div className={`chat_card d-flex align-items-center ${current_user?.chat_id == currentChat?.chat_id ? 'active' : ''}`} key={key} onClick={() => handalSelectChat(currentChat)}>
                                                <Avatar alt={currentChat?.firstName} src="/static/images/avatar/1.jpg" size={40} />
                                                <div className="textBox">
                                                    <div className="textContent">
                                                        <p className="h1">{currentChat?.firstName} {currentChat?.lastName}</p>
                                                        <span className="span text-success">online</span>
                                                    </div>
                                                    <p className="p">{currentChat?.last_chat?.text ? currentChat?.last_chat?.text : currentChat?.about}</p>
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
                {current_user?.status ? <ChatContainer mainRef={mainRef} /> : <NoChat />}
            </main>
        </div>
    )
}

export default ChatPage