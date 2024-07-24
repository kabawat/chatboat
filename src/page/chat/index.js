"use client"
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowRightLong } from "react-icons/fa6";


import ContactListSkeleton from '@/components/skeleton/contact_list';
import SearchSkeleton from '@/components/skeleton/seach_bar';
import ChatContainer from '@/components/chat/chat-container';
import ContaxtMenu from '@/components/chat/contaxt_menu';
import Navigate from '@/components/aside/navigate'
import NoChat from '@/components/chat/no-chat';
import Avatar from '@/components/comman/Avatar';

import { block_user_contact, get_contact_list, udpate_contact_lastchat, udpate_contact_lastseen } from '@/redux/slice/chat';
import { handalCurrentUser, update_current_user } from '@/redux/slice/user';
import { _scrollToEnd, _scrollToEndSmoothly } from '@/controllers/comman/scroll_to_end';
import { add_new_message, get_chat_message } from '@/redux/slice/message';
import { _mark_message_as_read } from '@/controllers/message/mark_as_read';
import { getStartMessage } from '@/redux/slice/static';
import { get_userList } from '@/redux/slice/user/userList';
import { useSocket } from '@/app/(chat)/layout';

import Search from './search';
import { formatTimeDifference } from '@/helper/timeCal';

const mousePos = {
    x: 0,
    y: 0
}
const ChatPage = () => {
    const socket = useSocket()
    // universal variable 
    const current_user = useSelector(state => state.current_user)
    const contacts = useSelector(state => state.contact)
    const profile = useSelector(state => state.profile)
    const theme = useSelector(state => state.theme)

    const [contextData, setContextData] = useState({})
    const [onlineUser, setOnlineUser] = useState(null)
    const [isContext, setIsContext] = useState(false)
    const [myContact, setMyContact] = useState([])
    const [getStart, setGetStart] = useState(false)
    const [mouse, setMouse] = useState(mousePos)

    const dispatch = useDispatch()
    const mainRef = useRef(null);

    // select user from list 
    const handalSelectChat = async (data) => {
        const payload = {
            chat_id: data?.chat_id,
            userID: profile?.data?._id
        }
        await _mark_message_as_read(payload) // make read message
        await dispatch(get_chat_message({ chat_id: data?.chat_id, page: 1, clean: true })).then(item => {
            if (!item.payload?.data?.totalMessages) {
                dispatch(getStartMessage())
            }
        })
        await dispatch(handalCurrentUser(data)) // set current user 
        _scrollToEnd(mainRef)// scroll bottom
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('click', () => {
                setIsContext(false)
            })
        }
    })

    // received message handal 
    useEffect(() => {
        // get all contact list 
        if (!contacts?.status && !contacts?.loading) {
            dispatch(get_contact_list())
        }

        // user come to online 
        const logedinHandler = (data) => {
            if (current_user?._id == data.data?.user_id) {
                let currentUser = {
                    ...current_user,
                    isOnline: data.data.isOnline,
                    lastSeen: data.data.lastSeen
                }
                dispatch(update_current_user(currentUser))
            } else {
                contacts?.data.map((contact) => {
                    if (contact._id == data.data?.user_id) {
                        setOnlineUser(data?.message)
                        setTimeout(() => {
                            setOnlineUser("")
                        }, 5000)
                    }
                })
            }
            dispatch(udpate_contact_lastseen(data.data))
        };

        // user go to offline 
        const offlineHandler = (data) => {
            if (current_user?._id == data?.user_id) {
                let currentUser = {
                    ...current_user,
                    isOnline: data?.isOnline,
                    lastSeen: data?.lastSeen
                }
                dispatch(update_current_user(currentUser))
            }
            dispatch(udpate_contact_lastseen(data))
        };

        // receive message handal 
        setMyContact(contacts?.data)
        const handalReceivedMessage = (data) => {
            const isExits = contacts?.data?.some(item => item?.chat_id === data?.chat_id)
            if (!isExits) {
                dispatch(get_contact_list())
            }

            if (`${current_user?.chat_id}` == `${data?.chat_id}`) {
                const payload = {
                    chat_id: data?.chat_id,
                    userID: profile?.data?._id
                }
                // make read message 
                _mark_message_as_read(payload).then((res) => {
                    dispatch(add_new_message(data))
                })

                _scrollToEndSmoothly(mainRef)
            }
            dispatch(udpate_contact_lastchat(data)) // update last seen message 
        }

        // sender typing 
        const handleUserTyping = (data) => {
            const newList = contacts?.data?.map((current) => {
                if (`${current?._id}` === `${data?.sender}`) {
                    return {
                        ...current,
                        last_seen: 'typing...'
                    }
                } else {
                    return current
                }
            })
            setMyContact(newList)
            console.log("user is typing", newList)
        }

        // block user 
        const blockUserHandler = (data) => {
            dispatch(block_user_contact(data))
            // update current user 
            if (current_user.chat_id == data?.chat_id) {
                let currentUser = {}
                if (data.is_block) {
                    currentUser = {
                        ...current_user,
                        blocked_by: [...current_user.blocked_by, data.blocked_by]
                    }
                } else {
                    const blocked_by = current_user.blocked_by.filter(item => `${item}` != `${data.blocked_by}`)
                    currentUser = {
                        ...current_user,
                        blocked_by: blocked_by
                    }
                }
                currentUser = {
                    ...currentUser,
                    is_block: currentUser?.blocked_by?.length ? true : false,
                }
                dispatch(update_current_user(currentUser))
            }
        }

        socket.on("received text", handalReceivedMessage)
        socket.on("blocked user", blockUserHandler)
        socket.on('offline', offlineHandler);
        socket.on('typing', handleUserTyping)
        socket.on('joined', logedinHandler);
        return () => {
            socket.off("received text", handalReceivedMessage)
            socket.off("blocked user", blockUserHandler)
            socket.off('offline', offlineHandler);
            socket.off('joined', logedinHandler);
            socket.off("typing", handleUserTyping)
        };
    }, [current_user, contacts])


    const handleContextMenu = (event, payload) => {
        setContextData(payload)
        event.preventDefault()
        setMouse({
            x: event.pageX,
            y: event.pageY
        })
        setIsContext(false)
        setTimeout(() => {
            setIsContext(true)
        }, 100)
    }

    const getStartWithNewChat = async () => {
        await dispatch(get_userList({})); // Get the user list from the API
        setGetStart(true); // Show the modal
    }
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
                                        <Avatar alt={profile?.data?.firstName} src={profile?.data?.picture} size={50} />
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
                                        <Search getStart={getStart} setGetStart={setGetStart} setMyContact={setMyContact} />
                                    </> : <SearchSkeleton />
                                }
                            </div>
                        </div>

                        {/* chat list  */}
                        <div className="side_main">
                            <div className="chatList_main_container">
                                {
                                    contacts?.status ? myContact?.map((currentChat, key) => {
                                        const lastSeen = currentChat?.isOnline ? 'Online' : formatTimeDifference(new Date(currentChat?.lastSeen))
                                        return (
                                            <div
                                                className={`chat_card d-flex align-items-center ${current_user?.chat_id == currentChat?.chat_id ? 'active' : ''}`}
                                                onContextMenu={e => handleContextMenu(e, currentChat)}
                                                onClick={() => handalSelectChat(currentChat)}
                                                key={key}
                                            >
                                                <Avatar alt={currentChat?.firstName} src={currentChat?.picture || ""} size={40} />
                                                <div className="textBox">
                                                    <div className="textContent">
                                                        <p className="h1">{currentChat?.firstName} {currentChat?.lastName}</p>
                                                        <span className={`span ${currentChat?.isOnline ? 'text-success' : 'text-primary'}`}>{lastSeen}</span>
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
                                {
                                    contacts?.status && !myContact?.length ? <div className='no_chat_container'>
                                        <div className="d-flex flex-column">
                                            <Image src="/assets/no-contact.svg" width={300} height={200} />
                                            <div className="avatar_heading text-center py-2 mt-2">
                                                <b>No Chat Yet</b>
                                            </div   >
                                            <div className="avatar_title text-center">Zero chats, zero fun! <br /> Pick someone and get chatting!</div>
                                            <div className="py-1 d-flex justify-content-center">
                                                <button className='btn text-primary' onClick={getStartWithNewChat}>Get Start <FaArrowRightLong /></button>
                                            </div>
                                        </div>
                                    </div> : <>
                                    </>
                                }
                            </div>
                            {isContext ? <ContaxtMenu data={contextData} mouse={mouse} /> : <></>}
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