import { FileContainer, SelectButton, SelectFileBox, FileList, FileIcon, Label, Title } from './style';
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { IoSearchOutline } from "react-icons/io5";
import { BiImages } from 'react-icons/bi';
import { GrSend } from "react-icons/gr";
import { Modal } from 'react-bootstrap';

import { block_user_contact, udpate_contact_lastchat } from '@/redux/slice/chat';
import { handalCurrentUser, update_current_user } from '@/redux/slice/user';
import { add_new_message, get_chat_message } from '@/redux/slice/message';
import { _scrollToEndSmoothly } from '@/controllers/comman/scroll_to_end';
import { useSocket } from '@/app/(chat)/layout';

import ChatMsgContextMenu from './contaxt_menu/chat/chat_message';
import RightSideDrawer from './right-aside';
import TextMessage from './msg/text';
import Avatar from '../comman/Avatar';
import Header from './header';
import Image from 'next/image';

const mouseInit = {
    x: 0,
    y: 0
}
const ChatContainer = ({ mainRef }) => {
    const socket = useSocket() // socket information

    // gloable state 
    const defaultMessage = useSelector(state => state.startMsg)
    const current_user = useSelector(state => state.current_user) // current chat user
    const contacts = useSelector(state => state?.contact)
    const profile = useSelector(state => state.profile) // logedin user information
    const chat = useSelector(state => state.chat) // current chat

    // local state 
    const [forwordContactList, setForwordContactList] = useState([])
    const [clipBoardReact, setClipBoardReact] = useState(null) // message reaction
    const [forwordPayload, setForwordPayload] = useState({}) // forword message
    const [previousHeight, setPreviousHeight] = useState(0) // chat scroll height
    const [paddingBottom, setPaddingBottom] = useState(60)
    const [searchValue, setSearchValue] = useState("")
    const [contextData, setContextData] = useState({})
    const [isProfile, setIsProfile] = useState(false) // right side user information
    const [isContext, setIsContext] = useState(false) // message context 
    const [showModal, setShowModal] = useState(false) // show forword message modal
    const [showFile, setShowFile] = useState(false) // styled components
    const [textMSG, setTextMSG] = useState('') // store text message
    const [mouse, setMouse] = useState(mouseInit) // mouse position

    const handalCloseModal = () => {
        setShowModal(false)
    }
    // References 
    const chatOperationRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const inputRef = useRef(null); // input box reference

    const dispatch = useDispatch()

    // input box 
    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleChange = (event) => {
        socket.emit('typing', {
            receiver: current_user?._id,
            sender: profile?.data?._id,
            isTyping: true
        });
        setTextMSG(event.target.innerText);

        if (chatOperationRef.current) {
            const height = chatOperationRef.current.offsetHeight;
            setPaddingBottom(height);
        }

        // Clear previous timeout if exists
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout for 5 seconds
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('typing', {
                receiver: current_user?._id,
                sender: profile?.data?._id,
                isTyping: false
            });
        }, 1000);
    };
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    // Reset the value of the file input field
    const handleFileChange = (event) => {
        event.target.value = '';
    };

    // send message handler 
    const handalSendMessage = () => {
        inputRef.current.innerHTML = ""
        const data = {
            text: textMSG,
            receiver: current_user?._id,
            sender: profile?.data?._id,
            chat_id: current_user?.chat_id
        }
        if (textMSG) {
            dispatch(add_new_message({ ...data, createdAt: new Date() }))
            socket.emit('send text', data)

            dispatch(udpate_contact_lastchat(data)) // update last seen message 
            setTextMSG("")
            setTimeout(() => {
                _scrollToEndSmoothly(mainRef)
            }, 100)
        }
    }

    // scroll when send message 
    const scrollToFirstMessage = () => {
        const newHeight = mainRef.current.scrollHeight
        const scrollIncrease = newHeight - previousHeight
        mainRef.current.scrollTop = scrollIncrease
    };

    const handalScroll = () => {
        if (mainRef.current.scrollTop == 0) {
            if (chat?.page <= chat?.totalPages) {
                dispatch(get_chat_message({ chat_id: current_user?.chat_id, page: chat?.page, clean: false })).then(() => {
                    scrollToFirstMessage()
                })
            }
        }
        if (mainRef) {
            setPreviousHeight(mainRef.current.scrollHeight)
        }
    }

    // show context menu 
    const handleContextMenu = (event, payload) => {
        event.preventDefault()
        setContextData(payload)

        // Get the x and y coordinates of the mouse pointer from the event object
        let x = event.pageX
        let y = event.pageY

        // Adjust the x and y coordinates if the context menu would appear outside the window
        if (event.pageX + 171 > window.innerWidth) {
            x = event.pageX - 171
        }
        if (event.pageY + 200 > window.innerHeight) {
            y = event.pageY - 200
        }
        setMouse({ x, y })
        //if show Contact menu then Hide the context menu temporarily
        setIsContext(false)
        // Show the context menu after a 100ms delay
        setTimeout(() => {
            setIsContext(true)
        }, 100)
    }

    const handleSendDefaultMsg = (msg) => {
        inputRef.current.innerHTML = msg
        setFocus()
        setTextMSG(msg)
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('click', () => {
                setTimeout(() => {
                    setIsContext(false)
                }, 100)
            })
        }
    })

    // forword message show modal
    const handleForwardMsgModal = async (payload) => {
        const contactsList = contacts?.data?.filter(item => item?._id?.toString() != current_user?._id?.toString())
        setForwordContactList(contactsList)
        setForwordPayload(payload)
        setShowModal(true)
    }

    // forword contact message
    const handleSearchContact = ({ target }) => {
        const searchTerm = target.value
        setSearchValue(searchTerm)
        const newContacts = contacts.data.filter(user => {
            const { firstName, lastName, email } = user;
            const term = searchTerm.toLowerCase();

            return (
                firstName.toLowerCase().includes(term) ||
                lastName.toLowerCase().includes(term) ||
                email.toLowerCase().includes(term)
            );
        });
        const contactsList = newContacts?.filter(item => item?._id?.toString() != current_user?._id?.toString())
        setForwordContactList(contactsList)
    }

    // forword message functionality 
    const handalForwordMessage = async (payload) => {
        const data = {
            text: forwordPayload?.text,
            receiver: payload?._id,
            sender: profile?.data?._id,
            chat_id: payload?.chat_id
        }
        await dispatch(add_new_message({ ...data, createdAt: new Date() }))
        socket.emit('send text', data)
        await dispatch(udpate_contact_lastchat(data))
        await dispatch(get_chat_message({ chat_id: payload?.chat_id, page: 1, clean: true }))
        await dispatch(handalCurrentUser(payload))
        setTimeout(() => {
            _scrollToEndSmoothly(mainRef)
        }, 100)
        setShowModal(false)
    }

    const handleUnblockContact = async () => {
        const payload = {
            chat_id: current_user?.chat_id,
            is_block: false, // query for unblock
            blocked_by: profile?.data?._id, // unblock by userself
            blocked_user: current_user?._id // unblock user
        }
        dispatch(block_user_contact(payload))
        socket.emit("block user", payload)
        const blocked_by = current_user.blocked_by.filter(item => `${item}` != `${profile?.data?._id}`)
        const currentUser = {
            ...current_user,
            blocked_by: blocked_by,
            is_block: blocked_by?.length ? true : false,
        }
        dispatch(update_current_user(currentUser))
    }

    return (
        <div className={`${isProfile ? 'active' : ''} chat-container`}>
            <div className="chat_area">
                <Header setIsProfile={setIsProfile} data={current_user} />
                <div className="chat_main_container" style={{ '--pb': `${paddingBottom}px` }}>
                    <div className="chat_section" onClick={() => setIsProfile(false)}>
                        <div className="chat_section_area">
                            <div className="chat_inner_section" ref={mainRef} style={{ scrollBehavior: 'smooth' }} onScroll={handalScroll}>
                                {
                                    chat?.data?.map((it_chat, key) => {
                                        return <TextMessage it_chat={it_chat} key={key} handleContextMenu={handleContextMenu} keys={key} clipBoardReact={clipBoardReact} />
                                    })
                                }
                                {
                                    !chat?.data?.length ? <>
                                        <div className="no_chat_container">
                                            <div className="p-3 d-flex flex-column align-items-center">
                                                <Image width={300} height={300} src="/assets/no-chat.png" />
                                                <h3 className='text-center'>let's start chatting!</h3>
                                                <p className='text-center'>
                                                    How was starting your first chat with your friends
                                                </p>
                                                <div className="d-flex">
                                                    <span className='rounded px-2 py-1 m-2 default_message' onClick={() => handleSendDefaultMsg(`hello! ${current_user?.firstName}`)}>hello! {current_user?.firstName}</span>
                                                    {
                                                        defaultMessage?.data?.map((item, key) => {
                                                            return <span key={key} className='rounded px-2 py-1 m-2 default_message' onClick={() => handleSendDefaultMsg(item)}>{item}</span>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </> : <></>
                                }
                                {/* message context menu  */}
                                {
                                    isContext ? <>
                                        <ChatMsgContextMenu
                                            setClipBoardReact={setClipBoardReact} // react message 
                                            handleForwardMsgModal={handleForwardMsgModal} // forword message handle
                                            payload={contextData}
                                            mouse={mouse}
                                        />
                                    </> : <></>
                                }
                                <Modal show={showModal} onHide={handalCloseModal}>
                                    <div className="seach_list">
                                        <div className="search_outer">
                                            <div className="searchbar d-flex">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <IoSearchOutline />
                                                </div>
                                                <div className="search_field">
                                                    <input type="text" placeholder="Search..." onChange={handleSearchContact} value={searchValue} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search_list_menu">
                                            {
                                                forwordContactList?.map((contect, key) => {
                                                    return (
                                                        <div className="d-flex align-items-center profile_main" key={key} onClick={() => handalForwordMessage(contect)}>
                                                            <Avatar alt="" src={contect?.profilePicture?.secure_url || '/'} size={40} />
                                                            <div className='px-2'>
                                                                <div className="avatar_heading">
                                                                    <b>{contect?.firstName} {contect?.lastName}</b>
                                                                </div>
                                                                <div className="avatar_title">
                                                                    {contect?.about}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>

                {/* chat operation container  */}
                <div className="chat_operation" ref={chatOperationRef}>
                    {
                        current_user?.is_block ? <>
                            <div className='block_user_container'>
                                {
                                    current_user?.blocked_by.includes(`${profile.data._id}`) ? <>
                                        <div className='block_contact_container'>
                                            <div className="block_box avatar_title py-1 px-2" onClick={handleUnblockContact}>
                                                You blocked this contact. <span>Tap to unblock</span>
                                            </div>
                                        </div>
                                    </> : <>
                                        <div className='block_contact_container'>
                                            <div className="avatar_title py-1 px-2">
                                                You are unable to chat with <span>{current_user?.firstName} {current_user?.lastName}</span> because they have blocked you.
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </> : <>
                            <div className="d-flex align-items-end">
                                {/* file select sectin  */}
                                <div className="FileContainer">
                                    <FileContainer>
                                        <SelectButton type='button' x={showFile ? 45 : 0} onClick={() => setShowFile(!showFile)}>
                                            <BsPlusLg />
                                        </SelectButton>
                                        <SelectFileBox show={showFile ? 'visible' : 'hidden'}>
                                            <FileList type='button' show={showFile}>
                                                <input type="file" id='pdf' name='pdf' accept='application/pdf' disabled />
                                                <FileIcon>
                                                    <BsFileEarmarkPdf />
                                                    <Label htmlFor='pdf'></Label>
                                                    <Title htmlFor='pdf'>PDF</Title>
                                                </FileIcon>
                                            </FileList>
                                            <FileList type='button' show={showFile}>
                                                <input type="file" id='picture' name="picture" accept='image/*' onChange={handleFileChange} />
                                                <FileIcon>
                                                    <BiImages />
                                                    <Label htmlFor='picture'></Label>
                                                    <Title htmlFor='picture'>Image</Title>
                                                </FileIcon>
                                            </FileList>
                                            <FileList type='button' show={showFile}>
                                                <input type="file" id='video' name="video" accept='video/*' onChange={handleFileChange} />
                                                <FileIcon>
                                                    <IoVideocamOutline />
                                                    <Label htmlFor='video'></Label>
                                                    <Title htmlFor='video'>Video</Title>
                                                </FileIcon>
                                            </FileList>
                                            <FileList type='button' show={showFile}>
                                                <input type="file" id='music' name="audio" accept=".mp3" onChange={handleFileChange} />
                                                <FileIcon>
                                                    <IoIosMusicalNotes />
                                                    <Label htmlFor='music'></Label>
                                                    <Title htmlFor='music'>Music</Title>
                                                </FileIcon>
                                            </FileList>
                                        </SelectFileBox>
                                    </FileContainer>
                                </div>

                                {/* input section  */}
                                <div id="w-input-container" onClick={setFocus}>
                                    <div className="w-input-text-group">
                                        <div id="w-input-text" ref={inputRef} onInput={handleChange} contentEditable></div>
                                        <div className="w-placeholder"> Type a message</div>
                                    </div>
                                </div>

                                {/* send button  */}
                                <div className="px-3">
                                    <button className='send_btn' onClick={handalSendMessage}>
                                        <span> Send </span>
                                        <GrSend />
                                    </button>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>

            {/* right side  */}
            <RightSideDrawer />
        </div >
    );
};

export default ChatContainer;
